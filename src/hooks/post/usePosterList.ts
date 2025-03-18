// 편지 리스트를 불러오는 API
import { useQuery } from "@tanstack/react-query";

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
