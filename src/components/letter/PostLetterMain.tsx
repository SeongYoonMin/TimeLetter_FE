"use client";

import StepFive from "@/app/post/letter/_components/StepFive";
import StepFour from "@/app/post/letter/_components/StepFour";
import StepLast from "@/app/post/letter/_components/StepLast";
import StepName from "@/app/post/letter/_components/StepName";
import StepOne from "@/app/post/letter/_components/StepOne";
import StepStart from "@/app/post/letter/_components/StepStart";
import StepThree from "@/app/post/letter/_components/StepThree";
import StepTwo from "@/app/post/letter/_components/StepTwo";
import { motion, AnimatePresence } from "framer-motion";
import React, { useCallback, useState } from "react";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const PostLetterMain = () => {
  const [step, setStep] = useState(0);
  const backStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);
  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 7));
  }, []);
  const steps = [
    <StepStart nextPage={nextStep} key="post-step-start" />,
    <StepName nextPage={nextStep} backPage={backStep} key="post-step-name" />,
    <StepOne nextPage={nextStep} backPage={backStep} key="post-step-one" />,
    <StepTwo nextPage={nextStep} backPage={backStep} key="post-step-two" />,
    <StepThree nextPage={nextStep} backPage={backStep} key="post-step-three" />,
    <StepFour nextPage={nextStep} backPage={backStep} key="post-step-four" />,
    <StepFive nextPage={nextStep} backPage={backStep} key="post-step-five" />,
    <StepLast backPage={backStep} key="post-step-last" />,
  ];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step} // key를 바꿔야 애니메이션이 적용됨
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`w-full h-full ${
          step === 0 || step === 7 ? "" : "pt-5 pb-4 px-5"
        }`}
      >
        {steps[step]}
      </motion.div>
    </AnimatePresence>
  );
};

export default PostLetterMain;
