import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { forwardRef } from "react";

interface CustomInputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    name?: string;
    id?: string;
    error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ 
    label, 
    type = "text", 
    placeholder,
    value,
    onChange,
    onBlur,
    name,
    id,
    error
}, ref) => {
    const inputId = id || name || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="grid w-full items-center gap-3">
            <Label htmlFor={inputId}>
                {label}
            </Label>
            <Input 
                ref={ref}
                id={inputId}
                name={name}
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onBlur={onBlur}
                className={error ? "border-red-500" : ""}
            />
            {error && (
                <span className="text-sm text-red-500">{error}</span>
            )}
        </div>
    );
});

export default CustomInput;