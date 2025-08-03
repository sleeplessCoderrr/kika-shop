import { useForm } from "@tanstack/react-form";

interface LoginFormValues {
    username: string;
    password: string;
};

const defaultAdmin: LoginFormValues = {
    username: "",
    password: ""
};

export const useLogin = () => {
    const form = useForm({
        defaultValues: defaultAdmin,
        onSubmit: async (values) => {
            // Handle login logic here
            console.log("Login submitted with values:", values);
        }
    });

    return form;
}