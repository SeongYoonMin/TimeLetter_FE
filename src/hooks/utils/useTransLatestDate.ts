import { useMemo } from "react";

export const useTransLatestDate = (date: string) => {
  return useMemo(() => {
    if (!date) return null; // 날짜 값이 없으면 null 반환

    const targetDate = new Date(date);
    const today = new Date();

    // 날짜 형식이 잘못되었을 경우 예외 처리
    if (isNaN(targetDate.getTime())) return null;

    // 현재 날짜와의 차이 계산 (밀리초 기준)
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위 변환

    return diffDays;
  }, [date]);
};
