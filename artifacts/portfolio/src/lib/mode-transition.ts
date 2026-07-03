import { createContext, useContext } from "react";

/**
 * Triggers the choreographed UX↔Writing transition: a color overlay covers the
 * screen, the route swaps underneath (hidden), then the overlay reveals the new
 * page. Provided by the TransitionShell in App.tsx; consumed by ModeToggle.
 */
export const TransitionContext = createContext<(href: string) => void>(() => {});

export const useModeTransition = () => useContext(TransitionContext);
