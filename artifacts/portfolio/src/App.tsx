import { useEffect, useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LightboxRoot } from "@/components/Lightbox";
import { TransitionContext } from "@/lib/mode-transition";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Writing from "@/pages/writing";
import Services from "@/pages/services";
import About from "@/pages/about";
import AdditionalWritingSamples from "@/pages/additional-writing-samples";
import GoalTypes from "@/pages/goal-types";
import BlsEmails from "@/pages/bls-emails";
import Twc from "@/pages/twc";
import RiskAgent from "@/pages/risk-agent";
import TextbookSolutions from "@/pages/textbook-solutions";
import CopywritingSamples from "@/pages/copywriting-samples";

const queryClient = new QueryClient();

// Solid background color per "mode". The overlay flashes this color to cover the
// screen while the route swaps underneath, so the toggle reads as a color inversion.
const UX_BG = "#2e2e2e";
const WRITING_BG = "#ffffff";
// Freelance (light) lives at the root; the UX portfolio (dark) lives under
// /portfolio. Old /case-study-* paths redirect into /portfolio, so treat them dark
// too to avoid a light flash before the redirect.
const bgForPath = (path: string) =>
  path.startsWith("/portfolio") || path.startsWith("/case-study") ? UX_BG : WRITING_BG;

type Phase = "idle" | "cover" | "reveal";

function Routes() {
  return (
    <Switch>
      {/* Freelance — the site root */}
      <Route path="/" component={Writing} />
      <Route path="/services" component={Services} />
      <Route path="/services/additional-writing-samples" component={AdditionalWritingSamples} />
      <Route path="/about" component={About} />
      <Route path="/copy-work">{() => <Redirect to="/services/additional-writing-samples" />}</Route>

      {/* UX Portfolio */}
      <Route path="/portfolio" component={Home} />
      <Route path="/portfolio/case-study/goal-types" component={GoalTypes} />
      <Route path="/portfolio/case-study/twc" component={Twc} />
      <Route path="/portfolio/case-study/risk-agent" component={RiskAgent} />
      <Route path="/portfolio/case-study/bls-emails" component={BlsEmails} />
      <Route path="/portfolio/case-study/textbook-solutions" component={TextbookSolutions} />
      <Route path="/portfolio/case-study/copywriting-samples" component={CopywritingSamples} />

      {/* Redirects from the previous URL structure */}
      <Route path="/writing">{() => <Redirect to="/" />}</Route>
      <Route path="/case-study-1">{() => <Redirect to="/portfolio/case-study/goal-types" />}</Route>
      <Route path="/case-study-onboarding">{() => <Redirect to="/portfolio/case-study/twc" />}</Route>
      <Route path="/case-study-agentic">{() => <Redirect to="/portfolio/case-study/risk-agent" />}</Route>
      <Route path="/case-study-2">{() => <Redirect to="/portfolio/case-study/bls-emails" />}</Route>
      <Route path="/case-study-coursehero">{() => <Redirect to="/portfolio/case-study/textbook-solutions" />}</Route>
      <Route path="/case-study-quinstreet">{() => <Redirect to="/portfolio/case-study/copywriting-samples" />}</Route>
      <Route path="/case-study-3">{() => <Redirect to="/portfolio/case-study/textbook-solutions" />}</Route>
      <Route path="/case-study-4">{() => <Redirect to="/portfolio/case-study/copywriting-samples" />}</Route>
      <Route path="/case-study-early-works">{() => <Redirect to="/portfolio/case-study/textbook-solutions" />}</Route>
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
        <LightboxRoot />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
