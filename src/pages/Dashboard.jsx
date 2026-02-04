import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Crosshair, Shield, Plus, MoreHorizontal, Check, Trash2, Calendar, ArrowUp } from 'lucide-react';
import Button from '../components/Button';
import BottomSheet from '../components/BottomSheet';
import { Input, TextArea } from '../components/Input';
import clsx from 'clsx';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

const Widget = ({ title, icon: Icon, children, className, onClick, color = "text-white" }) => (
    <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={clsx("bg-[#1e1f26] rounded-[24px] p-6 relative overflow-hidden", className)}
    >
        <div className="flex justify-between items-start mb-2">
            <div className={clsx("p-2 rounded-[14px] bg-white/5", color)}>
                <Icon size={22} />
            </div>
            <div className="text-text-tertiary">
                <MoreHorizontal size={20} />
            </div>
        </div>
        <div className="mt-2">
            <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider block mb-1">{title}</span>
            {children}
        </div>
    </motion.div>
);

const Checkbox = ({ checked, onToggle }) => (
    <div
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className={clsx(
            "w-6 h-6 rounded-full flex items-center justify-center transition-all border",
            checked ? "bg-primary border-primary" : "bg-transparent border-text-tertiary/50"
        )}
    >
        {checked && <Check size={14} className="text-white" />}
    </div>
);

// Tutorial Component
const TutorialOverlay = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "엔트로피와의 전쟁",
            desc: "인생은 가만히 두면 무질서해집니다. 이 게임은 당신의 삶에 '질서'를 부여하는 도구입니다.",
            highlight: null
        },
        {
            title: "1. 메인 미션 (1 Year)",
            desc: "1년 후 도달할 북극성입니다. 혼란스러운 세상에서 당신이 나아갈 단 하나의 방향입니다.",
            highlight: "mission"
        },
        {
            title: "2. 보스전 (1 Month)",
            desc: "미션을 위해 이번 달에 반드시 깨야 하는 프로젝트입니다. 이것을 깨면 경험치(XP)가 쌓입니다.",
            highlight: "boss"
        },
        {
            title: "3. 일일 퀘스트 (Daily)",
            desc: "매일 반복해야 하는 '시스템'입니다. 성공한 사람의 하루는 지루할 정도로 반복적입니다.",
            highlight: "daily"
        }
    ];

    const current = steps[step];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100] flex flex-col items-center justify-center p-6 text-center"
            onClick={handleNext}
        >
            <div className="relative z-10 max-w-sm">
                <div className="text-6xl mb-6">👇</div>
                <h2 className="text-2xl font-bold text-white mb-2">{current.title}</h2>
                <p className="text-text-secondary text-lg mb-8">{current.desc}</p>
                <Button variant="primary" size="md">
                    {step === steps.length - 1 ? "게임 시작" : "다음"}
                </Button>
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const [goals, setGoals] = useLocalStorage('life-fix-goals', {
        mission: '',
        bossFight: '',
        dailyLevers: ['', '', ''],
        constraints: ['', '']
    });

    const [dailyStatus, setDailyStatus] = useLocalStorage('life-fix-daily-status', {
        date: new Date().toDateString(),
        completed: [false, false, false]
    });

    const [tutorialSeen, setTutorialSeen] = useLocalStorage('life-fix-tutorial', false);
    const [showTutorial, setShowTutorial] = useState(false);

    // Show tutorial only on mount if not seen
    useEffect(() => {
        if (!tutorialSeen) {
            setShowTutorial(true);
        }
    }, [tutorialSeen]);

    // Sheet State
    const [sheetType, setSheetType] = useState(null);
    const isSheetOpen = !!sheetType;

    // Daily Reset Logic
    useEffect(() => {
        if (dailyStatus.date !== new Date().toDateString()) {
            setDailyStatus({
                date: new Date().toDateString(),
                completed: Array(goals.dailyLevers.length).fill(false)
            });
        }
    }, []);

    const toggleDaily = (index) => {
        const newCompleted = [...dailyStatus.completed];
        newCompleted[index] = !newCompleted[index];
        setDailyStatus(prev => ({ ...prev, completed: newCompleted }));
    };

    const updateGoal = (field, value) => setGoals(prev => ({ ...prev, [field]: value }));
    const updateArrayItem = (field, index, value) => {
        const newArray = [...goals[field]];
        newArray[index] = value;
        setGoals(prev => ({ ...prev, [field]: newArray }));
    };
    const removeItem = (field, index) => {
        const newArray = goals[field].filter((_, i) => i !== index);
        setGoals(prev => ({ ...prev, [field]: newArray }));
        if (field === 'dailyLevers') {
            const newCompleted = dailyStatus.completed.filter((_, i) => i !== index);
            setDailyStatus(prev => ({ ...prev, completed: newCompleted }));
        }
    };
    const addItem = (field) => {
        setGoals(prev => ({ ...prev, [field]: [...prev[field], ''] }));
        if (field === 'dailyLevers') {
            setDailyStatus(prev => ({ ...prev, completed: [...prev.completed, false] }));
        }
    };

    return (
        <div className="min-h-screen bg-bg-app pb-24 px-4 pt-6 max-w-md mx-auto relative">
            <AnimatePresence>
                {showTutorial && (
                    <TutorialOverlay onComplete={() => { setShowTutorial(false); setTutorialSeen(true); }} />
                )}
            </AnimatePresence>

            <header className="mb-8 px-2">
                <span className="t-sub font-semibold">{new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</span>
                <h1 className="t-h1 text-white mt-1">오늘의 전투</h1>
            </header>

            <div className="space-y-4">
                {/* 1. Mission Widget */}
                <Widget
                    title="Main Mission"
                    icon={Target}
                    color="text-primary"
                    onClick={() => setSheetType('mission')}
                >
                    <h2 className="t-h2 text-white leading-tight">
                        {goals.mission || "설정되지 않음"}
                    </h2>
                    <p className="t-sub text-primary mt-1 font-medium">1년 목표</p>
                </Widget>

                {/* 2. Boss Fight Widget */}
                <Widget
                    title="Boss Fight"
                    icon={Crosshair}
                    color="text-danger"
                    onClick={() => setSheetType('boss')}
                >
                    <h3 className="t-h3 text-white">
                        {goals.bossFight || "설정되지 않음"}
                    </h3>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-danger h-full w-[45%]" />
                    </div>
                </Widget>

                {/* 3. Daily Levers List */}
                <div className="bg-[#1e1f26] rounded-[24px] p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-white">
                            <Calendar size={20} className="text-success" />
                            <span className="font-bold text-lg">Daily Levers</span>
                        </div>
                        <button onClick={() => setSheetType('daily')} className="text-text-tertiary">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {goals.dailyLevers.map((lever, i) => (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{ opacity: dailyStatus.completed[i] ? 0.5 : 1 }}
                                className="flex items-center gap-3 py-2"
                                onClick={() => toggleDaily(i)}
                            >
                                <Checkbox checked={dailyStatus.completed[i]} onToggle={() => toggleDaily(i)} />
                                <span className={clsx("text-base flex-1", dailyStatus.completed[i] ? "line-through text-text-tertiary" : "text-white")}>
                                    {lever || "비어있음"}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. Constraints */}
                <Widget
                    title="Constraints"
                    icon={Shield}
                    color="text-text-secondary"
                    onClick={() => setSheetType('constraints')}
                    className="bg-[#18181b]"
                >
                    <div className="flex flex-wrap gap-2">
                        {goals.constraints.map((c, i) => (
                            c && <span key={i} className="px-3 py-1 bg-white/5 rounded-lg text-sm text-text-secondary border border-white/5">{c}</span>
                        ))}
                        {goals.constraints.length === 0 && <span className="text-text-tertiary">제약 조건 없음</span>}
                    </div>
                </Widget>
            </div>

            {/* Bottom Sheets for Editing */}
            <BottomSheet
                isOpen={sheetType === 'mission'}
                onClose={() => setSheetType(null)}
                title="메인 미션 수정"
            >
                <div className="space-y-4">
                    <TextArea
                        label="1년 후 목표 (The Mission)"
                        value={goals.mission}
                        onChange={(e) => updateGoal('mission', e.target.value)}
                        placeholder="인생을 바꿀 단 하나의 목표"
                    />
                    <Button onClick={() => setSheetType(null)} size="full" variant="primary">저장</Button>
                </div>
            </BottomSheet>

            <BottomSheet
                isOpen={sheetType === 'boss'}
                onClose={() => setSheetType(null)}
                title="보스전 설정"
            >
                <div className="space-y-4">
                    <TextArea
                        label="이번 달 프로젝트 (Boss Fight)"
                        value={goals.bossFight}
                        onChange={(e) => updateGoal('bossFight', e.target.value)}
                        placeholder="미션 달성을 위한 핵심 프로젝트"
                    />
                    <Button onClick={() => setSheetType(null)} size="full" variant="danger">저장</Button>
                </div>
            </BottomSheet>

            <BottomSheet
                isOpen={sheetType === 'daily'}
                onClose={() => setSheetType(null)}
                title="일일 레버 관리"
            >
                <div className="space-y-4">
                    {goals.dailyLevers.map((lever, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                value={lever}
                                onChange={(e) => updateArrayItem('dailyLevers', i, e.target.value)}
                                placeholder={`퀘스트 ${i + 1}`}
                            />
                            <button onClick={() => removeItem('dailyLevers', i)} className="p-3 bg-white/5 rounded-[16px] text-danger">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <Button onClick={() => addItem('dailyLevers')} variant="secondary" size="full" icon={Plus}>
                        새 퀘스트 추가
                    </Button>
                    <Button onClick={() => setSheetType(null)} size="full" variant="primary">완료</Button>
                </div>
            </BottomSheet>

            <BottomSheet
                isOpen={sheetType === 'constraints'}
                onClose={() => setSheetType(null)}
                title="제약 조건 관리"
            >
                <div className="space-y-4">
                    {goals.constraints.map((c, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                value={c}
                                onChange={(e) => updateArrayItem('constraints', i, e.target.value)}
                                placeholder="하지 말아야 할 것..."
                            />
                            <button onClick={() => removeItem('constraints', i)} className="p-3 bg-white/5 rounded-[16px] text-danger">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <Button onClick={() => addItem('constraints')} variant="secondary" size="full" icon={Plus}>
                        새 규칙 추가
                    </Button>
                    <Button onClick={() => setSheetType(null)} size="full" variant="primary">완료</Button>
                </div>
            </BottomSheet>

        </div>
    );
};

export default Dashboard;
