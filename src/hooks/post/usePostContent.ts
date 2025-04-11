import {
  SINGLE_CONTENT,
  MULTIPLE_CONTENT,
  MULTIPLE_CONTENT_END,
} from "@/lib/constant";

/**
 * useSingleContent 들은 유저가 편지를 작성할때 고른 선택지를 기반으로 컨텐츠를 만들어주는 hooks입니다.
 * SingleContent는 1개의 선택지로 이루어진 편지의 내용을 생성합니다.
 * @param content constant에 선언된 타입들
 * @param first firstView인지 확인하는 boolean
 * @returns 
 */
export const useSingleContent = (content: string, first: boolean = false) => {
  if (first) {
    return `야 나는 너가 처음에 ${content} 사람인줄 알았는데`;
  }
  return `친해지고보니 ${SINGLE_CONTENT[content]} 사람이여서 신기했어.`;
};

/**
 * useMultipleContent 들은 유저가 편지를 작성할때 고른 선택지를 기반으로 컨텐츠를 만들어주는 hooks입니다.
 * MultipleContent는 2~3개의 선택지로 이루어진 편지의 내용을 생성합니다.
 * @param content constant에 선언된 타입들의 배열
 * @param first firstView인지 확인하는 boolean
 * @returns 
 */
export const useMultipleContent = (
  content: string[],
  first: boolean = false,
) => {
  if (first) {
    return content.length > 2
      ? `야 나는 너가 처음에 ${
          MULTIPLE_CONTENT[content[0]]
        } 사람인줄 알았는데 ${
          MULTIPLE_CONTENT_END[content[1]]
        } 사람인데, 이런 ${MULTIPLE_CONTENT[content[1]]}더라.`
      : `야 나는 너가 처음에 ${
          MULTIPLE_CONTENT[content[0]]
        } 사람인줄 알았는데, 이런 ${MULTIPLE_CONTENT[content[1]]}더라.`;
  }
  if (content.length > 2) {
    return `친해지고보니 ${MULTIPLE_CONTENT[content[0]]}이고,  ${
      MULTIPLE_CONTENT_END[content[1]]
    } 사람인데, 이런 ${MULTIPLE_CONTENT[content[1]]}더라.`;
  }
  return `친해지고보니 ${MULTIPLE_CONTENT[content[0]]}고,  ${
    MULTIPLE_CONTENT_END[content[1]]
  } 사람이어서 신기했어`;
};
