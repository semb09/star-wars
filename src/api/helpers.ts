import { BASE_URL } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const makeURL = (sub: string, options?: { query?: string, id?: string }) => {
  let url = `${BASE_URL}${sub}`;
  if (options?.query) url += `/?search=${options.query}`;
  if (options?.id) url += `/${options.id}`;
  return url;
};
