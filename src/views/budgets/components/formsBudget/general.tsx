import React, { useEffect, useState } from 'react';
import useCompany from '../../../../hooks/useCompany';
import { IOwner } from '../../../../types/User';
import { Select } from '../../../../components/ui/select';
import { Input } from '../../../../components/ui/input';
import { SelectOwner } from '../../../../components/ui/selectOwner';
import { SelectUserEdit } from '../../../../components/ui/selectUserEdit';
import { Controller, useFormContext } from 'react-hook-form';
import { IBudgetCreate } from '../../../../types/Budget';


const systemUsers = [
  {
    id: 1,
    name: 'Juan Pérez',
    role: 'Ingeniero',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80',
    department: 'Ingeniería Civil',
    email: 'juan.perez@empresa.com',
    phone: '+1 234 567 890',
    experience: '8 años'
  },
  {
    id: 2,
    name: 'María García',
    role: 'Arquitecta',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&q=80',
    department: 'Diseño Arquitectónico',
    email: 'maria.garcia@empresa.com',
    phone: '+1 234 567 891',
    experience: '6 años'
  },
  {
    id: 3,
    name: 'Carlos López',
    role: 'Supervisor',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=32&h=32&fit=crop&q=80',
    department: 'Supervisión de Obras',
    email: 'carlos.lopez@empresa.com',
    phone: '+1 234 567 892',
    experience: '10 años'
  },
  {
    id: 4,
    name: 'Ana Martínez',
    role: 'Propietaria',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&q=80',
    department: 'Dirección',
    email: 'ana.martinez@empresa.com',
    phone: '+1 234 567 893',
    experience: '12 años'
  },
  {
    id: 5,
    name: 'Roberto Sánchez',
    role: 'Propietario',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&q=80',
    department: 'Dirección',
    email: 'roberto.sanchez@empresa.com',
    phone: '+1 234 567 894',
    experience: '15 años'
  }
];

const GeneralTab: React.FC = () => {
  const { data } = useCompany();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<IBudgetCreate>();

  useEffect(() => {
    console.log('Errors:', errors);
  }, [errors]);
  
  const baseFieldClass = `bg-[#2a2a2a] text-white rounded-md p-2 border border-gray-700 w-full`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Empresa"
          options={data ?? []}
          {...register('company_id', { required: 'La empresa es obligatoria' })}
          className={`${baseFieldClass} ${errors.company_id ? 'border-red-500 placeholder-red-500' : ''}`}
        />
        <Input
          label="Codigo"
          {...register('code', { required: 'El código es obligatorio' })}
          className={`${baseFieldClass} ${errors.code ? 'border-red-500 placeholder-red-500' : ''}`}
        />
      </div>
      <div>
        <Input
          label="Nombres"
          {...register('name', { required: 'El nombre es obligatorio' })}
          className={`${baseFieldClass} ${errors.name ? 'border-red-500 placeholder-red-500' : ''}`}
        />
      </div>
      <Controller
        name="owner_id"
        control={control}
        rules={{ required: 'El propietario es obligatorio' }}
        render={({ field: { onChange, value } }) => (
          <SelectOwner
            onOwnerSelect={(owner: IOwner) => onChange(owner)}
            data={data}
            systemUsers={systemUsers}
            label="Propietario"
            value={value}
            className={`${baseFieldClass} ${errors.owner_id ? 'border-red-500 placeholder-red-500' : ''}`}
          />
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="calculated_by_id"
          control={control}
          rules={{ required: 'El campo Calculado por es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <SelectUserEdit
              label="Calculado por"
              onUserSelect={(owner: IOwner | null) => {
                onChange(owner);
              }}
              systemUsers={systemUsers}
              data={data}
              value={value}
              className={`${baseFieldClass} ${errors.calculated_by_id ? 'border-red-500 placeholder-red-500' : ''}`}
            />
          )}
        />
        <Controller
          name="reviewed_by_id"
          control={control}
          rules={{ required: 'El campo Revisado por es obligatorio' }}
          render={({ field: { onChange, value } }) => (
            <SelectUserEdit
              label="Revisado por"
              onUserSelect={(owner: IOwner | null) => {
                onChange(owner);
              }}
              systemUsers={systemUsers}
              data={data}
              value={value}
              className={`${baseFieldClass} ${errors.reviewed_by_id ? 'border-red-500 placeholder-red-500' : ''}`}
            />
          )}
        />
      </div>
    </div>
  );
};

export default GeneralTab;
