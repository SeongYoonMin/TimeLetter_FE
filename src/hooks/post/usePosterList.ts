// 편지 리스트를 불러오는 API
import { useQuery } from "@tanstack/react-query";

export const usePosterList = ({ uniqueId }: { uniqueId: string }) => {
  return useQuery({
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
