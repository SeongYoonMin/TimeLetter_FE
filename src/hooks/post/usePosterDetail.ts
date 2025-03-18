// 편지 상세 조회를 불러오는 페이지

import { useQuery } from "@tanstack/react-query";

export const usePosterDetail = ({
  id,
  uniqueId,
}: {
  id: number;
  uniqueId: string;
}) => {
  return useQuery({
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
