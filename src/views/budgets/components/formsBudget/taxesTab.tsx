import React from 'react';
import { Input } from '../../../../components/ui/input';
import { useFormContext } from 'react-hook-form';
import { IBudgetCreate } from '../../../../types/Budget';

const TaxesTab: React.FC = () => {
    const {
        register,
        formState: { errors },
      } = useFormContext<IBudgetCreate>();
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-white mb-4">IVA</label>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-gray-300">
                        <input
                            type="radio"
                            id="iva_type"
                            className="text-orange-500"
                            value="NO_IVA"
                            {...register('iva_type')}

                        />
                        Sin IVA
                    </label>
                    <label className="flex items-center gap-2 text-gray-300">
                        <input
                            type="radio"
                            id="iva_type"
                            className="text-orange-500"
                            value="PRESUPUESTO_VALUACION"
                            {...register('iva_type')}
                        />
                        En Presupuesto y Valuación
                    </label>
                </div>
            </div>
            <div className="w-24">
                <Input
                    type="number"
                    label="Porcentaje"
                    {...register('iva_percentage', { required: 'ingrese iva' })}

                />
            </div>
        </div>
    );
};

export default TaxesTab;
