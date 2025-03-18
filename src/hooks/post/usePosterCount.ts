import { useQuery } from "@tanstack/react-query";

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
