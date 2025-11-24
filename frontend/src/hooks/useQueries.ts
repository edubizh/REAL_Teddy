import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { FilterCriteria, Movie } from '../backend';

export function useGetAllGenres() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['genres'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGenres();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllEras() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['eras'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEras();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllVibes() {
  const { actor, isFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['vibes'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVibes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFilteredMovies(criteria: FilterCriteria | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['filteredMovies', criteria],
    queryFn: async () => {
      if (!actor || !criteria) return [];
      return actor.getFilteredMovies(criteria);
    },
    enabled: !!actor && !isFetching && !!criteria,
  });
}
