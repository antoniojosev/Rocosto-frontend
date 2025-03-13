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
                <Input
                    label='Factor de labor directa'
                    type='number'
                    {...register('direct_labor_factor', { required: 'ingrese factor de labor directa' })}
                />
                <Input
                    label='% Administración'
                    type='number'
                    {...register('administration_percentage', { required: 'ingrese administracion' })}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label='% Utilidad'
                    type='number'
                    {...register('utility_percentage', { required: 'ingrese utilidad' })}
                />
                <Input
                    label='% Financiamiento'
                    type='number'
                    {...register('financing_percentage', { required: 'ingrese financiamiento' })}
                />
            </div>
        </div>
    );
};

export default CostTab;