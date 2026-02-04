import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Crosshair, Shield, Plus, MoreHorizontal, Check, Trash2, Calendar, ChevronLeft, ChevronRight, Lightbulb, RefreshCw } from 'lucide-react';
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

// Dan Koe Philosophy Tips
const TIPS = [
    "당신의 정체성이 바뀌지 않으면, 행동은 다시 원래대로 돌아갑니다.",
    "목표를 이루려 하지 마세요. 목표를 이룰 수밖에 없는 사람이 되세요.",
    "일일 퀘스트는 '재미'가 아니라 '시스템'입니다. 감정에 휘둘리지 마세요.",
    "보스전(1개월 프로젝트)은 당신의 XP를 획득하는 유일한 방법입니다.",
    "제약이 있어야 창의성이 생깁니다. 무한한 자유는 마비를 가져옵니다.",
    "미루는 것은 게으름이 아닙니다. 두려움입니다.",
    "안티-비전(Anti-Vision)은 당신을 밀어내는 힘, 비전은 당신을 끌어당기는 힘입니다.",
    "성공한 사람들의 하루는 지루할 정도로 반복적입니다.",
    "화요일에 무엇을 하는가가 당신의 인생을 결정합니다.",
    "엔트로피는 자연법칙입니다. 질서는 의도적으로 만들어야 합니다.",
    "당신이 원하는 삶을 살려면, 그 삶을 사는 사람의 하루를 먼저 살아야 합니다.",
    "게임이 재미있는 이유: 명확한 목표, 즉각적인 피드백, 적절한 난이도.",
    "1년 목표는 당신의 북극성입니다. 흔들리지 마세요.",
    "완벽한 계획보다 불완전한 실행이 낫습니다.",
    "몰입(Flow)은 도전과 실력이 만나는 지점에서 일어납니다."
];

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
    // Date management
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dateKey = selectedDate.toISOString().split('T')[0]; // "2026-02-05"
    const isToday = dateKey === new Date().toISOString().split('T')[0];

    const [goals, setGoals] = useLocalStorage('life-fix-goals', {
        mission: '',
        bossFight: '',
        dailyLevers: ['', '', ''],
        constraints: ['', '']
    });

    // History storage: { "2026-02-05": [true, false, true], "2026-02-04": [...] }
    const [history, setHistory] = useLocalStorage('life-fix-history', {});
    const dailyCompleted = history[dateKey] || Array(goals.dailyLevers.length).fill(false);

    const [tutorialSeen, setTutorialSeen] = useLocalStorage('life-fix-tutorial', false);
    const [showTutorial, setShowTutorial] = useState(false);

    // Tip system
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    useEffect(() => {
        if (!tutorialSeen) {
            setShowTutorial(true);
        }
    }, [tutorialSeen]);

    const [sheetType, setSheetType] = useState(null);
    const isSheetOpen = !!sheetType;

    const toggleDaily = (index) => {
        if (!isToday) return; // Only allow toggling for today

        const newCompleted = [...dailyCompleted];
        newCompleted[index] = !newCompleted[index];
        setHistory(prev => ({ ...prev, [dateKey]: newCompleted }));
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

        // Update all history entries to remove this index
        if (field === 'dailyLevers') {
            const newHistory = {};
            Object.keys(history).forEach(date => {
                newHistory[date] = history[date].filter((_, i) => i !== index);
            });
            setHistory(newHistory);
        }
    };

    const addItem = (field) => {
        setGoals(prev => ({ ...prev, [field]: [...prev[field], ''] }));

        if (field === 'dailyLevers') {
            // Update all history entries to add a new false entry
            const newHistory = {};
            Object.keys(history).forEach(date => {
                newHistory[date] = [...history[date], false];
            });
            setHistory(newHistory);
        }
    };

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const goToToday = () => setSelectedDate(new Date());

    const rotateTip = () => {
        setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
    };

    const completionRate = dailyCompleted.filter(Boolean).length / Math.max(goals.dailyLevers.length, 1);

    return (
        <div className="min-h-screen bg-bg-app pb-24 px-4 pt-6 max-w-md mx-auto relative">
            <AnimatePresence>
                {showTutorial && (
                    <TutorialOverlay onComplete={() => { setShowTutorial(false); setTutorialSeen(true); }} />
                )}
            </AnimatePresence>

            {/* Date Navigation Header */}
            <header className="mb-6 px-2">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => changeDate(-1)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} className="text-text-secondary" />
                    </button>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-primary" />
                            <span className="text-lg font-bold text-white">
                                {selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                            </span>
                        </div>
                        {!isToday && (
                            <button
                                onClick={goToToday}
                                className="text-xs text-primary hover:underline mt-1"
                            >
                                오늘로 이동
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => changeDate(1)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                        disabled={isToday}
                    >
                        <ChevronRight size={24} className={isToday ? "text-text-tertiary/30" : "text-text-secondary"} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${completionRate * 100}%` }}
                        className="bg-gradient-to-r from-primary to-success h-full rounded-full"
                    />
                </div>
                <p className="text-xs text-text-tertiary text-center mt-1">
                    {dailyCompleted.filter(Boolean).length} / {goals.dailyLevers.length} 완료
                </p>
            </header>

            {/* Tip Card */}
            <motion.div
                onClick={rotateTip}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-5 mb-6 cursor-pointer"
            >
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Lightbulb size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-white/90 leading-relaxed">
                            {TIPS[currentTipIndex]}
                        </p>
                    </div>
                    <button className="p-1 text-primary/70 hover:text-primary transition-colors">
                        <RefreshCw size={16} />
                    </button>
                </div>
            </motion.div>

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
                                animate={{ opacity: dailyCompleted[i] ? 0.5 : 1 }}
                                className={clsx(
                                    "flex items-center gap-3 py-2",
                                    isToday ? "cursor-pointer" : "cursor-default"
                                )}
                                onClick={() => toggleDaily(i)}
                            >
                                <Checkbox
                                    checked={dailyCompleted[i]}
                                    onToggle={() => toggleDaily(i)}
                                />
                                <span className={clsx("text-base flex-1", dailyCompleted[i] ? "line-through text-text-tertiary" : "text-white")}>
                                    {lever || "비어있음"}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {!isToday && (
                        <p className="text-xs text-text-tertiary mt-4 text-center">
                            과거 기록을 확인 중입니다. 오늘 날짜로 이동하여 수정하세요.
                        </p>
                    )}
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
                        {goals.constraints.filter(c => c).length === 0 && <span className="text-text-tertiary">제약 조건 없음</span>}
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
