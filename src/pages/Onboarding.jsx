import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import Button from '../components/Button';
import { TextArea, Input } from '../components/Input';

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

const STEPS = [
    // Philosophical Intro (Educational Phase)
    {
        id: 'edu-1',
        type: 'edu',
        title: '당신이 실패하는 이유',
        content: '대부분은 "행동"을 바꾸려 노력합니다.\n하지만 당신의 "정체성"이 그대로라면,\n행동은 결국 고무줄처럼 제자리로 돌아옵니다.\n\n진짜 변화는 나를 정의하는 방식에서 시작됩니다.',
        icon: '🎭'
    },
    {
        id: 'edu-2',
        type: 'edu',
        title: '정신적 엔트로피\n(Psychic Entropy)',
        content: '우리의 마음은 가만히 두면 불안과 혼란으로 향합니다.\n명확한 목표만이 이 혼란을 잠재우고,\n마음에 질서와 몰입(Flow)을 가져옵니다.',
        icon: '🌪️'
    },
    {
        id: 'edu-3',
        type: 'edu',
        title: '인생을 게임으로',
        content: '게임이 재미있는 이유는 명확합니다.\n목표(Mission), 적(Boss), 퀘스트(Daily)가 있기 때문입니다.\n\n이제 당신의 인생에 이 규칙을 적용하여,\n지루한 일상을 위대한 게임으로 바꿉니다.',
        icon: '🎮'
    },

    // Excavation Phase
    {
        id: 'anti-vision-1',
        title: '5년 후의 악몽\n(Anti-Vision)',
        type: 'input',
        field: 'antiVision5Yr',
        placeholder: '나는 여전히 같은 자리에서 불평만 하고 있다...',
        question: '지금 변하지 않는다면, 5년 후 당신은 어떤 지옥에 살고 있습니까?',
        why: '인간은 얻는 것보다 잃는 것에 더 크게 반응합니다. 당신의 나태함이 가져올 끔찍한 미래를 생생하게 직면하세요.'
    },
    {
        id: 'anti-vision-2',
        title: '후회의 무게',
        type: 'input',
        field: 'antiVision10Yr',
        placeholder: '가장 소중한 사람들에게 나는 패배자로 기억된다...',
        question: '10년 후, 거울 속의 당신은 무엇을 가장 후회하고 있습니까?',
        why: '시간은 당신을 기다려주지 않습니다. "나중에"라는 변명이 쌓여 만들어진 비참한 결말을 미리 확인하세요.'
    },
    {
        id: 'anti-vision-3',
        title: '가장 두려운 결말',
        type: 'input',
        field: 'costOfInaction',
        placeholder: '나는 내 잠재력을 낭비한 채 죽어간다...',
        question: '이대로 살다가 맞이할 인생의 마지막 날, 당신은 어떤 모습입니까?',
        why: '이것은 공포 요법입니다. 현재의 안락함이 사실은 서서히 당신을 죽이고 있음을 깨달아야 합니다.'
    },
    {
        id: 'vision-1',
        title: '3년 후, 이상적 화요일\n(The Vision)',
        type: 'input',
        field: 'vision3Yr',
        placeholder: '나는 알람 없이 눈을 뜨고, 설레는 마음으로 하루를 시작한다...',
        question: '모든 제약이 사라진다면, 당신의 완벽한 하루는 어떤 모습입니까?',
        why: '이제 당신의 뇌에 새로운 목적지를 입력합니다. 당신이 진정으로 원하는 삶의 "느낌"을 구체적으로 묘사하세요.'
    },
    {
        id: 'identity',
        title: '새로운 캐릭터 설정\n(New Identity)',
        type: 'identity',
        field: 'newIdentity',
        question: '그 이상적인 삶을 사는 "캐릭터"는 어떤 사람입니까?',
        why: '행동을 바꾸지 마세요. 정체성을 바꾸세요. "담배를 끊으려는 사람"이 아니라 "비흡연자"가 되어야 합니다.'
    },
    { id: 'complete', title: '설정 완료', type: 'outro' }
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useLocalStorage('life-fix-data', {
        antiVision5Yr: '',
        antiVision10Yr: '',
        costOfInaction: '',
        vision3Yr: '',
        newIdentity: '',
        firstAction: ''
    });

    const scrollRef = useRef(null);
    const step = STEPS[currentStep];
    const isLastStep = currentStep === STEPS.length - 1;

    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            navigate('/dashboard');
        }
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    return (
        <div className="min-h-screen bg-bg-app flex flex-col relative max-w-md mx-auto">
            {/* Header */}
            <div className="h-14 flex items-center px-4 sticky top-0 bg-bg-app/90 backdrop-blur z-10 w-full transition-all duration-200">
                {currentStep > 0 && (
                    <button onClick={prevStep} className="p-2 -ml-2 text-text-secondary hover:text-white transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                )}
                <div className="flex-1 flex justify-center">
                    <div className="flex gap-1.5">
                        {STEPS.map((s, idx) => (
                            <motion.div
                                key={idx}
                                initial={false}
                                animate={{
                                    backgroundColor: idx <= currentStep ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    scale: idx === currentStep ? 1.2 : 1
                                }}
                                className="w-1.5 h-1.5 rounded-full"
                            />
                        ))}
                    </div>
                </div>
                <div className="w-10" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-6 pt-8 pb-32 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 flex flex-col"
                    >
                        {/* EDUCATIONAL SLIDES */}
                        {step.type === 'edu' && (
                            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 min-h-[60vh]">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1, type: "spring" }}
                                    className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center text-6xl shadow-xl shadow-primary/10 border border-primary/20"
                                >
                                    {step.icon}
                                </motion.div>
                                <div className="space-y-4">
                                    <h1 className="t-h1 text-white whitespace-pre-line leading-tight">
                                        {step.title}
                                    </h1>
                                    <p className="t-body text-text-secondary whitespace-pre-line leading-relaxed opacity-90">
                                        {step.content}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* INPUT STEPS */}
                        {(step.type === 'input' || step.type === 'identity') && (
                            <div className="space-y-8">
                                <div>
                                    <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block opacity-80">Step {currentStep - 2}</span>
                                    <h1 className="t-h1 text-white whitespace-pre-line block">
                                        {step.title}
                                    </h1>
                                    <p className="t-body text-text-secondary mt-3 text-lg">{step.question}</p>
                                </div>

                                {/* Philosophical Context (The "Why") */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-bg-surface/50 p-5 rounded-2xl border border-white/5 backdrop-blur-md"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-primary text-xl">💡</span>
                                        <p className="text-[15px] text-text-secondary leading-relaxed font-medium">
                                            {step.why}
                                        </p>
                                    </div>
                                </motion.div>

                                {step.type === 'input' ? (
                                    <TextArea
                                        value={data[step.field]}
                                        onChange={e => handleChange(step.field, e.target.value)}
                                        placeholder={step.placeholder}
                                        className="bg-bg-surface border-none text-[17px] leading-relaxed min-h-[180px] focus:ring-primary/40"
                                        autoFocus
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        <Input
                                            label="정체성 선언 (I am...)"
                                            value={data[step.field]}
                                            onChange={e => handleChange(step.field, e.target.value)}
                                            placeholder="나는 매일 성장하는 사람이다..."
                                            className="bg-bg-surface text-[17px]"
                                            autoFocus
                                        />
                                        <Input
                                            label="첫 번째 행동 (First Action)"
                                            value={data.firstAction}
                                            onChange={e => handleChange('firstAction', e.target.value)}
                                            placeholder="오늘 당장 할 일..."
                                            className="bg-bg-surface text-[17px]"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* OUTRO */}
                        {step.type === 'outro' && (
                            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 min-h-[60vh]">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 rounded-full border-2 border-primary/30 border-t-primary"
                                />
                                <div className="space-y-4">
                                    <h1 className="t-h1 text-white">준비 완료.</h1>
                                    <p className="t-body text-text-secondary">
                                        당신의 지옥(Anti-Vision)과<br />천국(Vision)이 정의되었습니다.<br /><br />
                                        이제 엔트로피에 맞서<br />당신만의 게임을 시작할 시간입니다.
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Persistent Bottom Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-app via-bg-app/95 to-transparent max-w-md mx-auto z-20">
                <Button
                    onClick={nextStep}
                    size="full"
                    variant="primary"
                    className="shadow-xl shadow-primary/20 text-lg h-14"
                >
                    {step.type === 'outro' ? '게임 접속하기' : '다음'}
                </Button>
            </div>
        </div>
    );
};

export default Onboarding;
