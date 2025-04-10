import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IBudgetCreate } from '../../../../types/Budget';

const OtherTab: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<IBudgetCreate>();
    return (
        <div className="space-y-4">
            <div>
                <label className="flex items-center gap-2 text-gray-300">
                    <input
                        type="checkbox"
                        className={`text-orange-500 ${errors.use_medical_insurance ? 'border-red-500 placeholder-red-500' : ''}`}
                        {...register('use_medical_insurance', { required: 'Este campo es obligatorio' })}
                    />
                    Usar Gastos Médicos e Implementos de Seguridad
                    {errors.use_medical_insurance && <span className="text-red-500">*</span>}
                {errors.use_medical_insurance && (
                    <span className="text-red-500 text-sm">
                        {errors.use_medical_insurance.message}
                    </span>
                )}
                </label>
            </div>
            <div>
                <label className="flex items-center gap-2 text-gray-300">
                    <input
                        type="checkbox"
                        className={`text-orange-500 ${errors.use_associated_cost_factor ? 'border-red-500 placeholder-red-500' : ''}`}
                        {...register('use_associated_cost_factor', { required: 'Este campo es obligatorio' })}
                    />
                    Aplicar doble factor de costo asociado
                    {errors.use_associated_cost_factor && <span className="text-red-500">*</span>}
                {errors.use_associated_cost_factor && (
                    <span className="text-red-500 text-sm">
                        {errors.use_associated_cost_factor.message}
                    </span>
                )}
                </label>
            </div>
        </div>
    );
};

export default OtherTab;