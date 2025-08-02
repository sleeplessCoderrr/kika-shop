import React, { type ReactNode } from 'react';

interface HeadingProps {
    children?: ReactNode;
    content?: string;
    size?: 'small' | 'medium' | 'large';
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

function Heading({ 
    children, 
    content, 
    size = 'medium', 
    level = 1, 
    className = '',
    align = 'left'
}: HeadingProps) {
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
    
    const sizeClasses = {
        small: 'text-2xl',
        medium: 'text-4xl',
        large: 'text-6xl'
    };
    
    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };
    
    const baseClasses = 'scroll-m-20 font-extrabold tracking-tight text-balance';
    const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${alignClasses[align]} ${className}`.trim();
    
    return (
        <Tag className={combinedClasses}>
            {children || content || 'Default Heading'}
        </Tag>
    );
}

export default Heading;