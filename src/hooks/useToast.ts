import { toast as sonnerToast } from 'sonner';

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastFunction {
  (message: string, options?: ToastOptions): string | number;
}

interface UseToastReturn {
  toast: ToastFunction;
  success: ToastFunction;
  error: ToastFunction;
  warning: ToastFunction;
  info: ToastFunction;
  loading: (message: string, options?: Omit<ToastOptions, 'action'>) => string | number;
  dismiss: (toastId?: string | number) => void;
  dismissAll: () => void;
}

export const useToast = (): UseToastReturn => {
  const formatToastContent = (message: string, options?: ToastOptions) => {
    if (options?.title) {
      return {
        title: options.title,
        description: message,
        duration: options.duration,
        action: options.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      };
    }
    return {
      description: message,
      duration: options?.duration,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    };
  };

  return {
    toast: (message: string, options?: ToastOptions) => {
      const content = formatToastContent(message, options);
      return sonnerToast(content.title || message, content);
    },

    success: (message: string, options?: ToastOptions) => {
      const content = formatToastContent(message, options);
      return sonnerToast.success(content.title || message, content);
    },

    error: (message: string, options?: ToastOptions) => {
      const content = formatToastContent(message, options);
      return sonnerToast.error(content.title || message, content);
    },

    warning: (message: string, options?: ToastOptions) => {
      const content = formatToastContent(message, options);
      return sonnerToast.warning(content.title || message, content);
    },

    info: (message: string, options?: ToastOptions) => {
      const content = formatToastContent(message, options);
      return sonnerToast.info(content.title || message, content);
    },

    loading: (message: string, options?: Omit<ToastOptions, 'action'>) => {
      const content = formatToastContent(message, options);
      return sonnerToast.loading(content.title || message, {
        description: content.description,
        duration: content.duration,
      });
    },

    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId);
    },

    dismissAll: () => {
      sonnerToast.dismiss();
    },
  };
};