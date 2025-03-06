"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const steps = [
  {
    title: "내 첫인상",
    imgSrc: "/img/first-step.png",
    description: () => (
      <>
        <p>나 첫인상 어땠어?</p>
        <p>라는 질문을 해본 적 있나요?</p>
      </>
    ),
  },
  {
    title: "추억속의 나",
    imgSrc: "/img/second-step.png",
    description: () => (
      <>
        <p>추억속의 나는 친구들에게</p>
        <p>어떤 모습이었을까요?</p>
      </>
    ),
  },
  {
    title: "5년전 10년 전의 나",
    imgSrc: "/img/third-step.png",
    description: () => (
      <>
        <p>5년전 10년전의 나에게 친구</p>
        <p>들이 보내는 편지를 받아보세요.</p>
      </>
    ),
  },
  {
    title: "나만의 타임 캡슐",
    imgSrc: "/img/fourth-step.png",
    description: () => (
      <>
        <p>나만의 타임 캡슐을 만들면</p>
        <p>편지를 받을 수 있어요.</p>
      </>
    ),
  },
];

const OnboardingContainer = ({
  handleFirstVisitor,
}: {
  handleFirstVisitor: () => void;
}) => {
  const [step, setStep] = useState(0);
  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  return (
    <div className="flex items-center h-full justify-between flex-col px-5 py-10">
      {/* Stepper UI */}
      <div className="flex items-center justify-center gap-1 text-[#441606] text-body">
        <p>{step + 1}</p>
        <p>/</p>
        <p>{steps.length}</p>
      </div>
      {/* 애니메이션 적용 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step} // key를 바꿔야 애니메이션이 적용됨
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-center justify-center w-full gap-6"
        >
          <Image
            src={steps[step].imgSrc}
            width={100}
            height={100}
            alt={steps[step].title}
          />
          <div className="bg-[#FFDBA8] w-full px-4 py-3 rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] text-[#441606] text-header">
            {steps[step].description()}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 버튼 */}

      {step !== 3 ? (
        <button
          onClick={nextStep}
          type="button"
          disabled={step === steps.length - 1}
          className="bg-[#FF9225] w-full h-[68px] text-body flex items-center justify-center rounded-[20px] text-white"
        >
          다음
        </button>
      ) : (
        <button
          type="button"
          onClick={handleFirstVisitor}
          className="bg-[#FF9225] w-full h-[68px] text-body flex items-center justify-center rounded-[20px] text-white"
        >
          시작하기
        </button>
      )}
    </div>
  );
};

export default OnboardingContainer;
