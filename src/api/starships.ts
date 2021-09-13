import { useQueries } from 'react-query';

export interface Starship {
  name: string,
}

type Props = {
  urls: string[],
  shouldFetch: boolean,
  onSuccess: () => void;
}

// eslint-disable-next-line import/prefer-default-export
export const useStarships = ({ urls, shouldFetch, onSuccess }: Props) => {
  const fetchStarship = (url: string) => () => fetch(url)
    .then((res) => {
      onSuccess();
      return res.json() as unknown as Starship;
    });

  return useQueries(urls.map((url: string) => ({
    queryKey: ['starship', url],
    queryFn: fetchStarship(url),
    enabled: shouldFetch,
  }))) as { data: Starship, isLoading: boolean }[];
};
