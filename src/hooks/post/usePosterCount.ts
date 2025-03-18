import { useQuery } from "@tanstack/react-query";

export const usePosterCount = (uniqueId: string) => {
  return useQuery<{ postCount: number; newPostCount: number }>({
    queryKey: [uniqueId],
    queryFn: async () => {
      const res = await fetch("/api/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${uniqueId}`,
        },
      });
      return await res.json();
    },
  });
};
