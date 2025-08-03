import { useForm } from "@tanstack/react-form";
import { useAuth } from "./useAuth";
import { useRouter } from "@tanstack/react-router";

interface LoginFormValues {
    email: string;
    password: string;
};

const defaultAdmin: LoginFormValues = {
    email: "",
    password: ""
};

export const useLogin = () => {
    const { signIn } = useAuth();
    const router = useRouter();

    const form = useForm({
        defaultValues: defaultAdmin,
        onSubmit: async ({ value }) => {
           const { error } = await signIn(value.email, value.password);
            
            if (error) {
                console.error("Login error:", error);
                // Handle error (show toast, set form error, etc.)
            } else {
                router.navigate({ to: "/cart" });
            }
        }
    });

    return form;
}