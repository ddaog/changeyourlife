import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const BottomSheet = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 bg-[#1e1f26] rounded-t-[32px] z-50 max-h-[90vh] overflow-y-auto border-t border-white/5 pb-8"
                    >
                        <div className="flex justify-center pt-3 pb-2">
                            <div className="w-12 h-1.5 bg-white/10 rounded-full" />
                        </div>

                        <div className="px-6 pb-6">
                            <div className="flex justify-between items-center mb-6 mt-2">
                                <h2 className="text-xl font-bold text-white">{title}</h2>
                                <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-text-secondary">
                                    <X size={20} />
                                </button>
                            </div>
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;
