import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, FieldValues, Path, Control } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'file';
}

// 1. أضفنا <T extends FieldValues,> ليعمل الـ TypeScript بشكل صحيح
const FormField = <T extends FieldValues,>({
                                               control,
                                               name,
                                               label,
                                               placeholder,
                                               type
                                           }: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem className="w-full">
                {/* 2. استخدمنا المتغير label بدلاً من كلمة Username الثابتة */}
                <FormLabel className="text-light-100">{label}</FormLabel>

                <FormControl>
                    <Input
                        type={type} // 3. أضفنا نوع الحقل
                        placeholder={placeholder} // 4. استخدمنا المتغير placeholder
                        className=" input"
                        {...field}
                    />
                </FormControl>

                <FormMessage className="text-destructive-100" />
            </FormItem>
        )}
    />
);

export default FormField;






