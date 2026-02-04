import React, { forwardRef } from 'react';
import clsx from 'clsx';

export const Input = forwardRef(({ label, className, error, ...props }, ref) => (
    <div className="flex flex-col gap-2 w-full">
        {label && <label className="text-sm font-semibold text-text-tertiary ml-1">{label}</label>}
        <input
            ref={ref}
            className={clsx(
                'w-full bg-[#1e1f26] text-white placeholder-text-tertiary rounded-[16px] px-5 py-4 text-[17px]',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                'disabled:opacity-50',
                error && 'ring-2 ring-danger/50',
                className
            )}
            {...props}
        />
        {error && <span className="text-danger text-sm ml-1">{error}</span>}
    </div>
));

export const TextArea = forwardRef(({ label, className, error, ...props }, ref) => (
    <div className="flex flex-col gap-2 w-full">
        {label && <label className="text-sm font-semibold text-text-tertiary ml-1">{label}</label>}
        <textarea
            ref={ref}
            className={clsx(
                'w-full bg-[#1e1f26] text-white placeholder-text-tertiary rounded-[16px] px-5 py-4 text-[17px] min-h-[140px] resize-none',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all',
                error && 'ring-2 ring-danger/50',
                className
            )}
            {...props}
        />
        {error && <span className="text-danger text-sm ml-1">{error}</span>}
    </div>
));
