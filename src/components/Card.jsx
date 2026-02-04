import React from 'react';
import clsx from 'clsx';

const Card = ({ children, className, glow = 'none' }) => {
    return (
        <div
            className={clsx(
                'glass-panel p-8 relative overflow-hidden transition-all duration-300',
                glow === 'primary' && 'hover:shadow-[0_0_30px_rgba(76,201,240,0.2)] border-primary/20',
                glow === 'danger' && 'hover:shadow-[0_0_30px_rgba(247,37,133,0.2)] border-danger/20',
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;
