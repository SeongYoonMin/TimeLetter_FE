import {
  SINGLE_CONTENT,
  MULTIPLE_CONTENT,
  MULTIPLE_CONTENT_END,
} from "@/lib/constant";

export const useSingleContent = (content: string) => {
  return `친해지고보니 ${SINGLE_CONTENT[content]} 사람이여서 신기했어.`;
};

export const useMultipleContent = (content: string[]) => {
  if (content.length > 2) {
    return `친해지고보니 ${MULTIPLE_CONTENT[content[0]]}이고,  ${
      MULTIPLE_CONTENT_END[content[1]]
    } 사람인데, 이런 ${MULTIPLE_CONTENT[content[1]]}더라.`;
  }
  return `친해지고보니 ${MULTIPLE_CONTENT[content[0]]}고,  ${
    MULTIPLE_CONTENT_END[content[1]]
  } 사람이어서 신기했어`;
};
