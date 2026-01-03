import { createContext } from "react";

type DismissContextValue = {
    register: (fn: () => void) => () => void;
    dismissAll: () => void;
    dismissOnlyNotStandardFields: () => void;
    dismissOnlyStandardFields: () => void;
};

export const DismissFieldFocusContext = createContext<DismissContextValue | null>(null);
