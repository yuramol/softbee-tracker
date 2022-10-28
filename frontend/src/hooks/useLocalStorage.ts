import { Maybe, Scalars } from 'types/GraphqlTypes';

export const useLocalStorage = (
  key: Scalars['String'],
  value: Maybe<Scalars['String']> = null
) => {
  if (!Object.prototype.hasOwnProperty.call(window.localStorage, key)) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  const storedValue = JSON.parse(`${window.localStorage.getItem(key)}`);
  const setStorageValue = (newValue: Maybe<Scalars['String']>) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [storedValue, setStorageValue];
};
