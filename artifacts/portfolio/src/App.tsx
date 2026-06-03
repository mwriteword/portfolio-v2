import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CaseStudy1 from "@/pages/case-study-1";
import CaseStudy2 from "@/pages/case-study-2";
import CaseStudyOnboarding from "@/pages/case-study-onboarding";
import CaseStudyAgentic from "@/pages/case-study-agentic";
import CaseStudyCourseHero from "@/pages/case-study-coursehero";
import CaseStudyQuinStreet from "@/pages/case-study-quinstreet";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
