import { useQuery } from "@tanstack/react-query";

export const usePosterCount = ({
  nickname,
  capsule,
  uniqueId,
}: {
  nickname: string;
  capsule: string;
  uniqueId: string;
}) => {
  return useQuery<{ postCount: number; newPostCount: number }>({
    queryKey: [nickname, capsule, uniqueId],
    queryFn: async () => {
      const res = await fetch("/api/post", {
        headers: {
          Authorization: `Bearer ${uniqueId}`,
        },
      });
      return await res.json();
    },
  });
};
