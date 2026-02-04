import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    onClick,
    disabled = false,
    icon: Icon
}) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[#3182f6] text-white active:bg-[#1b64da]",
        secondary: "bg-[#2a2b33] text-white active:bg-[#3a3b45]",
        ghost: "bg-transparent text-text-secondary active:bg-white/5",
        danger: "bg-[#ef4444] text-white active:bg-[#dc2626]"
    };

    const sizes = {
        sm: "h-10 px-4 rounded-[14px] text-[14px]",
        md: "h-12 px-5 rounded-[18px] text-[16px]",
        lg: "h-14 px-8 rounded-[22px] text-[18px]",
        full: "w-full h-14 rounded-[20px] text-[17px]"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.96 }}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            onClick={onClick}
            disabled={disabled}
        >
            {Icon && <Icon size={20} className="mr-2" />}
            {children}
        </motion.button>
    );
};

export default Button;
