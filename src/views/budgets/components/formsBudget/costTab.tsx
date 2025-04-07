import React from 'react';
import { Input } from '../../../../components/ui/input';
import { useFormContext } from 'react-hook-form';
import { IBudgetCreate } from '../../../../types/Budget';


const CostTab: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<IBudgetCreate>();
    
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Input
                        label='Factor de labor directa'
                        type='number'
                        {...register('direct_labor_factor', { required: 'ingrese factor de labor directa' })}
                        className={`${errors.direct_labor_factor ? 'border-red-500 placeholder-red-500' : ''}`}
                    />
                    {errors.direct_labor_factor && (
                        <p className="text-red-500 text-sm mt-1">{errors.direct_labor_factor.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        label='% Administración'
                        type='number'
                        {...register('administration_percentage', { required: 'ingrese administracion' })}
                        className={`${errors.administration_percentage ? 'border-red-500 placeholder-red-500' : ''}`}
                    />
                    {errors.administration_percentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.administration_percentage.message}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Input
                        label='% Utilidad'
                        type='number'
                        {...register('utility_percentage', { required: 'ingrese utilidad' })}
                        className={`${errors.utility_percentage ? 'border-red-500 placeholder-red-500' : ''}`}
                    />
                    {errors.utility_percentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.utility_percentage.message}</p>
                    )}
                </div>
                <div>
                    <Input
                        label='% Financiamiento'
                        type='number'
                        {...register('financing_percentage', { required: 'ingrese financiamiento' })}
                        className={`${errors.financing_percentage ? 'border-red-500 placeholder-red-500' : ''}`}
                    />
                    {errors.financing_percentage && (
                        <p className="text-red-500 text-sm mt-1">{errors.financing_percentage.message}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CostTab;