import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 여러 개의 Tailwind 클래스를 결합하는 유틸리티 함수
 * - clsx: 조건부로 클래스를 추가할 수 있도록 도와줌
 * - twMerge: Tailwind CSS 클래스 중복을 최적화
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}