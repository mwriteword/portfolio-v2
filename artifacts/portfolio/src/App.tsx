import { useEffect, useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransitionContext } from "@/lib/mode-transition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Writing from "@/pages/writing";
import CaseStudy1 from "@/pages/case-study-1";
import CaseStudy2 from "@/pages/case-study-2";
import CaseStudyOnboarding from "@/pages/case-study-onboarding";
import CaseStudyAgentic from "@/pages/case-study-agentic";
import CaseStudyCourseHero from "@/pages/case-study-coursehero";
import CaseStudyQuinStreet from "@/pages/case-study-quinstreet";

const queryClient = new QueryClient();

// Solid background color per "mode". The overlay flashes this color to cover the
// screen while the route swaps underneath, so the toggle reads as a color inversion.
const UX_BG = "#2e2e2e";
const WRITING_BG = "#ffffff";
const bgForPath = (path: string) => (path === "/writing" ? WRITING_BG : UX_BG);

type Phase = "idle" | "cover" | "reveal";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/writing" component={Writing} />
      <Route path="/case-study-1" component={CaseStudy1} />
      <Route path="/case-study-2" component={CaseStudy2} />
      <Route path="/case-study-onboarding" component={CaseStudyOnboarding} />
      <Route path="/case-study-agentic" component={CaseStudyAgentic} />
      <Route path="/case-study-coursehero" component={CaseStudyCourseHero} />
      <Route path="/case-study-quinstreet" component={CaseStudyQuinStreet} />
      {/* Redirects for old URLs */}
      <Route path="/case-study-3">{() => <Redirect to="/case-study-coursehero" />}</Route>
      <Route path="/case-study-4">{() => <Redirect to="/case-study-quinstreet" />}</Route>
      <Route path="/case-study-early-works">{() => <Redirect to="/case-study-coursehero" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Owns the UX↔Writing transition. Defers the actual route change until a solid
 * color overlay has covered the screen, so the content never visibly swaps in the
 * open — the old page holds, the color "flashes" over it, then the new page is
 * revealed underneath. Plain (non-toggle) navigation falls through with no overlay.
 */
function TransitionShell() {
  const [location, setLocation] = useLocation();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [pending, setPending] = useState<string | null>(null);

  // Keep <body> synced to whatever page is currently displayed (covers overscroll).
  useEffect(() => {
    document.body.style.backgroundColor = bgForPath(location);
  }, [location]);

  const startTransition = useCallback(
    (href: string) => {
      if (href === location) return;
      if (reduceMotion) {
        setLocation(href);
        return;
      }
      setPending(href);
      setPhase("cover");
    },
    [location, reduceMotion, setLocation],
  );

  // While covering, flash the destination color; while revealing, it's already current.
  const overlayColor = phase === "cover" && pending ? bgForPath(pending) : bgForPath(location);

  const handleOverlayComplete = () => {
    if (phase === "cover" && pending) {
      setLocation(pending); // swap content + body bg, hidden behind the opaque overlay
      setPending(null);
      window.scrollTo(0, 0);
      setPhase("reveal");
    } else if (phase === "reveal") {
      setPhase("idle");
    }
  };

  return (
    <TransitionContext.Provider value={startTransition}>
      <Routes />
      {phase !== "idle" && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100]"
          style={{ backgroundColor: overlayColor, pointerEvents: phase === "cover" ? "auto" : "none" }}
          initial={{ opacity: phase === "cover" ? 0 : 1 }}
          animate={{ opacity: phase === "cover" ? 1 : 0 }}
          transition={{ duration: phase === "cover" ? 0.4 : 0.5, ease: "easeInOut" }}
          onAnimationComplete={handleOverlayComplete}
        />
      )}
    </TransitionContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <TransitionShell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
