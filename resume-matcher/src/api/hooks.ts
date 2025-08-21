import { useQuery } from "@tanstack/react-query";
import api from "./api";

export function useHello() {
  return useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const res = await api.get("/");
      return res.data;
    },
  });
}
