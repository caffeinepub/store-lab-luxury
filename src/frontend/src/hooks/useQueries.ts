import { useQuery } from "@tanstack/react-query";
import { Category } from "../backend";
import type { Product } from "../backend";
import { useActor } from "./useActor";

export { Category };
export type { Product };

export function useInitialize() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["initialize"],
    queryFn: async () => {
      if (!actor) return null;
      await actor.initialize();
      return true;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWatchProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["watchProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(Category.watch);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useShoeProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["shoeProducts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(Category.shoe);
    },
    enabled: !!actor && !isFetching,
  });
}
