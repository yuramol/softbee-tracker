import { Maybe, Scalars } from 'types/GraphqlTypes';

export const useLocalStorage = (
  key: Scalars['String'],
  value: Maybe<Scalars['String']> = ''
) => {
  const storedValue = JSON.parse(`${window.localStorage.getItem(key)}`);

  if (storedValue === null) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  const setStorageValue = (newValue: Maybe<Scalars['String']>) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { storedValue, setStorageValue };
};
