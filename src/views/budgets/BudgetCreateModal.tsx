import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateBudget } from '../../hooks/useBudget';
import { IBudget, IBudgetCreate } from '../../types/Budget';
import StepIndicator from './components/stepIndicator';
import GeneralTab from './components/formsBudget/general';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import CostTab from './components/formsBudget/costTab';
import TaxesTab from './components/formsBudget/taxesTab';
import OtherTab from './components/formsBudget/otherTab';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBudget: (budget: IBudget) => void;

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateBudget }) => {
  const [activeTab, setActiveTab] = useState('general')
  const mutation = useCreateBudget();

  // Lista de inputs del formulario para el trigger
  const tabGeneral = [
    'company_id', // Empresa
    'code',       // Código
    'name',       // Nombres
    'owner_id',   // Propietario
    'calculated_by_id', // Calculado por
    'reviewed_by_id'    // Revisado por
  ] as const;

  const tabCostos = [
    'direct_labor_factor', // Factor de labor directa
    'administration_percentage', // % Administración
    'utility_percentage', // % Utilidad
    'financing_percentage' // % Financiamiento
  ] as const;

  const tabTaxes = [
    'iva_type', // Tipo de IVA
    'iva_percentage' // Porcentaje de IVA
  ] as const;

  const tabOthers = [
    'use_medical_insurance', // Usar Gastos Médicos e Implementos de Seguridad
    'use_associated_cost_factor' // Aplicar doble factor de costo asociado
  ] as const;

  const tabs = [
    { id: 'general', label: 'General', completed: true },
    { id: 'costos', label: 'Costos', completed: activeTab === 'costos' || activeTab === 'impuestos' || activeTab === 'otros' },
    { id: 'impuestos', label: 'Impuestos', completed: activeTab === 'impuestos' || activeTab === 'otros' },
    { id: 'otros', label: 'Otros', completed: activeTab === 'otros' }
  ];

  // Función para validar campos según la pestaña activa
  const validateTabFields = async (tabId: string): Promise<boolean> => {
    let isValid = false;

    if (tabId === 'general') {
      isValid = await trigger(tabGeneral);
    } else if (tabId === 'costos') {
      isValid = await trigger(tabCostos);
    } else if (tabId === 'impuestos') {
      isValid = await trigger(tabTaxes);
    } else if (tabId === 'otros') {
      isValid = await trigger(tabOthers);
    }

    return isValid;
  };

  const handleTabChange = async (tabId: string) => {
    // Validamos la pestaña actual antes de cambiar
    const isValid = await validateTabFields(activeTab);
    if (isValid || tabId === activeTab) {
      setActiveTab(tabId);
    }
  };

  const onSubmit: SubmitHandler<IBudgetCreate> = budgetData => {
    console.log('Datos del formulario:', budgetData);
    mutation.mutate(budgetData, {
      onSuccess: (data) => {
        onCreateBudget(data);
      }
    });
  };        

  const methods = useForm<IBudgetCreate>({
    defaultValues: {
      company_id: '',
      code: '',
      name: '',
    },
    mode: 'onChange', // Valida los campos al cambiar su valor
    reValidateMode: 'onChange', // Revalida los campos al cambiar su valor
  });

  const { trigger } = methods;

  const handleNext = async () => {
    const isValid = await validateTabFields(activeTab);

    if (isValid) {
      const currentIndex = tabs.findIndex(t => t.id === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-2xl font-semibold">Nuevo Presupuesto</h2>
                <button type="button" onClick={()=>onClose()} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <StepIndicator
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)] min-h-[calc(40vh)] pr-2 custom-scrollbar">
                {activeTab === 'general' && (
                  <GeneralTab />
                )}

                {activeTab === 'costos' && (
                  <CostTab />
                )}

                {activeTab === 'impuestos' && (
                  <TaxesTab />
                )}

                {activeTab === 'otros' && (
                  <OtherTab />
                )}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800 mb-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <div className={`w-2 h-2 rounded-full bg-orange-500`} />
                  <span className="text-sm">Paso {tabs.findIndex(t => t.id === activeTab) + 1} de 4</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={()=>onClose()}
                  className="px-4 py-2 text-white bg-[#2a2a2a] rounded-md hover:bg-[#3a3a3a] transition-colors"
                >
                  Cancelar
                </button>
                {activeTab === 'otros' ? (
                  <button
                    type="submit"
                    id='btn-create-budget'
                    className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Crear Presupuesto
                  </button>
                ) : (
                  <button
                    type="button"
                    id='btn-tab'
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                    className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Modal;