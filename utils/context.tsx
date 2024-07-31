import React from 'react';

type CreateContext = <T extends object>() => readonly [
  () => T,
  React.Provider<T | null>,
];

export const createContext: CreateContext = <T extends object>() => {
  const Context = React.createContext<T | null>(null);

  function useContext() {
    const ctx = React.useContext(Context);
    if (!ctx) {
      throw new Error('Cannot use context outside the provider');
    }

    return ctx;
  }

  return [useContext, Context.Provider] as const;
};
