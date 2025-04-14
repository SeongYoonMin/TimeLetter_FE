import { useQuery } from "@tanstack/react-query";

/**
 * usePosterDetail 는 포스터의 상세 정보를 불러오는 API hooks입니다.
 * @param id 포스터의 id
 * @param uniqueId 유저 고유 아이디
 * @returns 
 */
export const usePosterDetail = <T>({
  id,
  uniqueId,
}: {
  id: number;
  uniqueId: string;
}) => {
  return useQuery<T>({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await fetch(`/api/post/${id}`, {
        headers: {
          Authorization: `Bearer ${uniqueId}`,
        },
      });
      return await response.json();
    },
  });
};
