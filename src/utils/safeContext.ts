import React, { useContext } from "react";

export default function useSafeContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);
  const useThisContext = () : T => {
    const context = useContext<T | undefined>(Context);
    if (!context) throw new Error("useSafeContext: hook must be inside a " +
                                  "<Provider> with a value");
    return context;
  };

  return [Context.Provider, useThisContext] as const;
}
