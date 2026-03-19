import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CaseStudy1 from "@/pages/case-study-1";
import CaseStudy2 from "@/pages/case-study-2";
import CaseStudy3 from "@/pages/case-study-3";
import CaseStudy4 from "@/pages/case-study-4";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/case-study-1" component={CaseStudy1} />
      <Route path="/case-study-2" component={CaseStudy2} />
      <Route path="/case-study-3" component={CaseStudy3} />
      <Route path="/case-study-4" component={CaseStudy4} />
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
