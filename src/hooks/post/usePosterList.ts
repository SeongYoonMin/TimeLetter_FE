import { useQuery } from "@tanstack/react-query";

/**
 * usePosterList 는 포스터의 리스트를 불러오는 API hooks입니다.
 * @param uniqueId 유저 고유 아이디
 * @returns 
 */
export const usePosterList = <T>(uniqueId: string) => {
  return useQuery<T[]>({
    queryKey: ["post", uniqueId],
    queryFn: async () => {
      const response = await fetch(`/api/post`, {
        headers: {
          Authorization: `Bearer ${uniqueId}`,
        },
      });
      return await response.json();
    },
  });
};
