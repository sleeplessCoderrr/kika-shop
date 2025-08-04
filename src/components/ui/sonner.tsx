import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

interface CustomToasterProps extends Omit<ToasterProps, 'theme'> {
  variant?: 'default' | 'clean' | 'minimal';
}

const Toaster = ({ variant = "clean", ...props }: CustomToasterProps) => {
  const { theme = "system" } = useTheme()

  const getThemeStyles = () => {
    const lightStyles = {
      "--normal-bg": "white",
      "--normal-text": "#1f2937",
      "--normal-border": "#e5e7eb",
      "--success-bg": "white",
      "--success-text": "#065f46",
      "--success-border": "#10b981",
      "--error-bg": "white", 
      "--error-text": "#7f1d1d",
      "--error-border": "#ef4444",
      "--warning-bg": "white",
      "--warning-text": "#92400e", 
      "--warning-border": "#f59e0b",
      "--info-bg": "white",
      "--info-text": "#1e40af",
      "--info-border": "#3b82f6",
    } as React.CSSProperties;

    const darkStyles = {
      "--normal-bg": "#1f2937",
      "--normal-text": "#f9fafb",
      "--normal-border": "#374151",
      "--success-bg": "#1f2937",
      "--success-text": "#34d399",
      "--success-border": "#10b981",
      "--error-bg": "#1f2937", 
      "--error-text": "#fca5a5",
      "--error-border": "#ef4444",
      "--warning-bg": "#1f2937",
      "--warning-text": "#fbbf24", 
      "--warning-border": "#f59e0b",
      "--info-bg": "#1f2937",
      "--info-text": "#60a5fa",
      "--info-border": "#3b82f6",
    } as React.CSSProperties;

    // If using CSS variables from your theme system
    if (variant === 'default') {
      return {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties;
    }

    // For system theme, let CSS handle it with prefers-color-scheme
    if (theme === "system") {
      return {
        ...lightStyles,
        "@media (prefers-color-scheme: dark)": darkStyles
      } as React.CSSProperties;
    }

    return theme === "dark" ? darkStyles : lightStyles;
  };

  const getToastOptions = () => {
    const baseOptions = {
      style: {
        background: 'var(--normal-bg)',
        border: '1px solid var(--normal-border)',
        borderRadius: '0.75rem',
        boxShadow: theme === 'dark' 
          ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '16px 20px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        lineHeight: '1.5',
        color: 'var(--normal-text)',
        minHeight: '60px',
      },
      className: 'font-inter',
      actionButtonStyle: {
        background: theme === 'dark' ? '#f1f5f9' : '#1e293b',
        color: theme === 'dark' ? '#1e293b' : 'white',
        borderRadius: '0.5rem',
        border: 'none',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '500',
      },
      cancelButtonStyle: {
        background: theme === 'dark' ? '#374151' : '#f3f4f6',
        color: theme === 'dark' ? '#d1d5db' : '#6b7280',
        borderRadius: '0.5rem',
        border: 'none',
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '500',
      }
    };

    if (variant === 'minimal') {
      return {
        ...baseOptions,
        style: {
          ...baseOptions.style,
          boxShadow: 'none',
          border: 'none',
          background: theme === 'dark' ? '#111827' : '#f9fafb',
        }
      };
    }

    return baseOptions;
  };

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={getThemeStyles()}
      toastOptions={getToastOptions()}
      expand={true}
      duration={4000}
      richColors
      closeButton
      {...props}
    />
  )
}

export { Toaster }