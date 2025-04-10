import React from "react";
import { Input } from "../../../../components/ui/input";
import { useFormContext } from "react-hook-form";
import { IBudgetCreate } from "../../../../types/Budget";

const TaxesTab: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IBudgetCreate>();
  return (
    <div className="space-y-8">
      <div>
        <label className={`block mb-4 text-white`}>
          IVA
          {errors.iva_type && (
            <span className="text-red-500 text-sm"> - {errors.iva_type.message}</span>
          )}
        </label>
        <div className="space-y-2">
          <label
            className={`flex items-center gap-2 text-gray-300`}
          >
            <input
              type="radio"
              id="iva_type"
              value="NO_IVA"
              {...register("iva_type", {
                required: "Seleccione un tipo de IVA",
              })}
            />
            Sin IVA
          </label>
          <label
            className={`flex items-center gap-2 text-gray-300`}
          >
            <input
              type="radio"
              id="iva_type"
              className={`text-orange-500}`}
              value="PRESUPUESTO_VALUACION"
              {...register("iva_type", {
                required: "Seleccione un tipo de IVA",
              })}
            />
            En Presupuesto y Valuación
          </label>
        </div>
        
      </div>
      <div className="w-24">
        <Input
          type="number"
          label="Porcentaje"
          {...register("iva_percentage", { required: "Ingrese IVA" })}
          className={`${
            errors.iva_percentage ? "border-red-500 placeholder-red-500" : ""
          }`}
        />
        {errors.iva_percentage && (
          <p className="text-red-500 text-sm mt-1">{errors.iva_percentage.message}</p>
        )}
      </div>
    </div>
  );
};

export default TaxesTab;
