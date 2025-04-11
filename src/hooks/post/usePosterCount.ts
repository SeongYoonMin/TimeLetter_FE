import { useQuery } from "@tanstack/react-query";

/**
 * usePosterContent 는 포스터의 갯수를 불러오는 API hooks입니다.
 * @param uniqueId 유저 고유 아이디
 * @returns 
 */
export const usePosterCount = <T>(uniqueId: string) => {
  return useQuery<T>({
    queryKey: [uniqueId],
    queryFn: async () => {
      const res = await fetch("/api/post/count", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${uniqueId}`,
        },
      });
      return await res.json();
    },
  });
};
