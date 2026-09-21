"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useSavedSchemes } from "./useSavedSchemes";

type SavedSchemesContextValue =
  ReturnType<typeof useSavedSchemes>;

const SavedSchemesContext =
  createContext<
    SavedSchemesContextValue | undefined
  >(undefined);

type SavedSchemesProviderProps = {
  children: ReactNode;
};

export function SavedSchemesProvider({
  children,
}: SavedSchemesProviderProps) {
  const savedSchemes =
    useSavedSchemes();

  return (
    <SavedSchemesContext.Provider
      value={savedSchemes}
    >
      {children}
    </SavedSchemesContext.Provider>
  );
}

export function useSavedSchemesContext() {
  const context = useContext(
    SavedSchemesContext
  );

  if (context === undefined) {
    throw new Error(
      "useSavedSchemesContext must be used inside SavedSchemesProvider"
    );
  }

  return context;
}

export default SavedSchemesContext;