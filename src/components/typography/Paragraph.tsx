import { type ReactNode } from 'react';

interface ParagraphProps {
    children?: ReactNode;
    content?: string;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
    variant?: 'default' | 'muted' | 'lead';
}

function Paragraph({ 
    children, 
    content, 
    size = 'medium', 
    className = '',
    align = 'left',
    variant = 'default'
}: ParagraphProps) {
    const sizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
    };
    
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify'
    };
    
    const variantClasses = {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        lead: 'text-xl text-muted-foreground'
    };
    
    const baseClasses = 'leading-7 [&:not(:first-child)]:mt-6';
    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${alignClasses[align]} ${variantClasses[variant]} ${className}`.trim();
    
    return (
        <p className={combinedClasses}>
            {children || content || 'Default paragraph text'}
        </p>
    );
}

export default Paragraph;