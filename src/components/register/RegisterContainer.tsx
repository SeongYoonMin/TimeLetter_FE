"use client";

import StepFour from "@/app/(unauth)/register/_components/StepFour";
import StepOne from "@/app/(unauth)/register/_components/StepOne";
import StepThree from "@/app/(unauth)/register/_components/StepThree";
import StepTwo from "@/app/(unauth)/register/_components/StepTwo";
import React, { useState, useCallback } from "react";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import { useRegisterStore } from "@/providers/RegisterProvider";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const RegisterContainer = () => {
  const [step, setStep] = useState(0);
  const {
    setBackground,
    setCapsule,
    setNickname,
    background,
    capsule,
    nickname,
  } = useRegisterStore((store) => store);
  const backStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);
  const nextBackground = useCallback(
    (value: string) => {
      setBackground(value);
      setStep(1);
    },
    [setBackground]
  );
  const nextCapsule = useCallback(
    (value: string) => {
      setCapsule(value);
      setStep(2);
    },
    [setCapsule]
  );
  const nextNickname = useCallback(
    (value: string) => {
      setNickname(value);
      setStep(3);
    },
    [setNickname]
  );

  const steps = [
    <StepOne
      key="step-one"
      nextClick={nextBackground}
      background={background}
      step={step}
      total={4}
    />,
    <StepTwo
      key="step-two"
      background={background}
      nextClick={nextCapsule}
      capsule={capsule}
      step={step}
      total={4}
      back={backStep}
    />,
    <StepThree
      key="step-three"
      step={step}
      total={4}
      nickname={nickname}
      nextNick={nextNickname}
      back={backStep}
    />,
    <StepFour key="step-four" step={step} total={4} back={backStep} />,
  ];

  return (
    <article className="flex flex-col w-full h-full relative">
      {/* 애니메이션 적용 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step} // key를 바꿔야 애니메이션이 적용됨
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 w-full"
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </article>
  );
};

export default RegisterContainer;
