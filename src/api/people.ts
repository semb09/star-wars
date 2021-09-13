import { useInfiniteQuery } from 'react-query';
import { makeURL } from './helpers';

export interface Person {
  name: string,
  starships: string[],
}

type Result = {
  results: Person[],
  count: number,
  next: string,
};

type Props = {
  query?: string,
  onSuccess: () => void,
}

// eslint-disable-next-line import/prefer-default-export
export const useInfinitePeople = ({ query, onSuccess }: Props) => {
  const fetchPeople = ({ pageParam }: { pageParam?: string }) => fetch(pageParam || makeURL('people', { query }))
    .then((res) => {
      onSuccess();
      return res.json() as unknown as Result;
    });

  return useInfiniteQuery(['people', query], fetchPeople, {
    getNextPageParam: (lastPage) => lastPage.next,
  });
};
