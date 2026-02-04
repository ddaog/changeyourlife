import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Edit2, Save, Flame, Star, User } from 'lucide-react';
import Button from '../components/Button';
import { TextArea, Input } from '../components/Input';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    const save = (newValue) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, save];
};

const Profile = () => {
    const navigate = useNavigate();
    const [data, setData] = useLocalStorage('life-fix-data', {
        antiVision5Yr: '',
        antiVision10Yr: '',
        costOfInaction: '',
        vision3Yr: '',
        newIdentity: '',
        firstAction: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [tempData, setTempData] = useState(data);

    const handleEdit = () => {
        setTempData(data);
        setEditMode(true);
    };

    const handleSave = () => {
        setData(tempData);
        setEditMode(false);
    };

    const handleCancel = () => {
        setTempData(data);
        setEditMode(false);
    };

    const handleChange = (field, value) => {
        setTempData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-bg-app pb-24 px-4 pt-6 max-w-md mx-auto">
            {/* Header */}
            <header className="mb-8 flex items-center justify-between">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors"
                >
                    <ChevronLeft size={24} className="text-text-secondary" />
                </button>

                <div className="flex-1 text-center">
                    <h1 className="text-2xl font-bold text-white">Your Why</h1>
                    <p className="text-sm text-text-tertiary">당신의 동기</p>
                </div>

                <button
                    onClick={editMode ? handleCancel : handleEdit}
                    className="p-2 -mr-2 hover:bg-white/5 rounded-full transition-colors"
                >
                    {editMode ? (
                        <span className="text-sm text-text-secondary">취소</span>
                    ) : (
                        <Edit2 size={20} className="text-text-secondary" />
                    )}
                </button>
            </header>

            {/* Anti-Vision Section */}
            <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-danger/20 rounded-lg">
                        <Flame size={20} className="text-danger" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Anti-Vision</h2>
                    <span className="text-xs text-text-tertiary">(피해야 할 미래)</span>
                </div>

                <div className="space-y-4">
                    <div className="bg-bg-surface/50 p-5 rounded-2xl border border-danger/10">
                        <h3 className="text-sm font-semibold text-danger mb-2">5년 후의 악몽</h3>
                        {editMode ? (
                            <TextArea
                                value={tempData.antiVision5Yr}
                                onChange={e => handleChange('antiVision5Yr', e.target.value)}
                                className="bg-bg-app text-[15px] min-h-[100px]"
                            />
                        ) : (
                            <p className="text-text-secondary text-[15px] leading-relaxed whitespace-pre-wrap">
                                {data.antiVision5Yr || '설정되지 않음'}
                            </p>
                        )}
                    </div>

                    <div className="bg-bg-surface/50 p-5 rounded-2xl border border-danger/10">
                        <h3 className="text-sm font-semibold text-danger mb-2">10년 후, 남겨진 것들</h3>
                        {editMode ? (
                            <TextArea
                                value={tempData.antiVision10Yr}
                                onChange={e => handleChange('antiVision10Yr', e.target.value)}
                                className="bg-bg-app text-[15px] min-h-[100px]"
                            />
                        ) : (
                            <p className="text-text-secondary text-[15px] leading-relaxed whitespace-pre-wrap">
                                {data.antiVision10Yr || '설정되지 않음'}
                            </p>
                        )}
                    </div>

                    <div className="bg-bg-surface/50 p-5 rounded-2xl border border-danger/10">
                        <h3 className="text-sm font-semibold text-danger mb-2">가장 두려운 결말</h3>
                        {editMode ? (
                            <TextArea
                                value={tempData.costOfInaction}
                                onChange={e => handleChange('costOfInaction', e.target.value)}
                                className="bg-bg-app text-[15px] min-h-[100px]"
                            />
                        ) : (
                            <p className="text-text-secondary text-[15px] leading-relaxed whitespace-pre-wrap">
                                {data.costOfInaction || '설정되지 않음'}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Star size={20} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Vision</h2>
                    <span className="text-xs text-text-tertiary">(꿈꾸는 미래)</span>
                </div>

                <div className="bg-bg-surface/50 p-5 rounded-2xl border border-primary/10">
                    <h3 className="text-sm font-semibold text-primary mb-2">3년 후, 이상적 화요일</h3>
                    {editMode ? (
                        <TextArea
                            value={tempData.vision3Yr}
                            onChange={e => handleChange('vision3Yr', e.target.value)}
                            className="bg-bg-app text-[15px] min-h-[120px]"
                        />
                    ) : (
                        <p className="text-text-secondary text-[15px] leading-relaxed whitespace-pre-wrap">
                            {data.vision3Yr || '설정되지 않음'}
                        </p>
                    )}
                </div>
            </section>

            {/* Identity Section */}
            <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-success/20 rounded-lg">
                        <User size={20} className="text-success" />
                    </div>
                    <h2 className="text-xl font-bold text-white">New Identity</h2>
                    <span className="text-xs text-text-tertiary">(새로운 정체성)</span>
                </div>

                <div className="bg-bg-surface/50 p-5 rounded-2xl border border-success/10">
                    {editMode ? (
                        <Input
                            value={tempData.newIdentity}
                            onChange={e => handleChange('newIdentity', e.target.value)}
                            className="bg-bg-app text-[15px]"
                            placeholder="나는..."
                        />
                    ) : (
                        <p className="text-white text-[16px] font-medium">
                            {data.newIdentity || '설정되지 않음'}
                        </p>
                    )}
                </div>
            </section>

            {/* Save Button (Fixed at Bottom) */}
            {editMode && (
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-app via-bg-app/95 to-transparent max-w-md mx-auto z-20">
                    <Button
                        onClick={handleSave}
                        size="full"
                        variant="primary"
                        className="shadow-xl shadow-primary/20"
                    >
                        <Save size={18} className="mr-2" />
                        저장하기
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Profile;
