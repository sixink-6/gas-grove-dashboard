
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Alerting from "./pages/Alerting";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import RoleManagement from "./pages/RoleManagement";
import UserManagement from "./pages/UserManagement";
import Reporting from "./pages/Reporting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alerting" element={<Alerting />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/settings" element={<Settings />}>
            <Route path="/settings" element={<RoleManagement />} />
            <Route path="/settings/role-management" element={<RoleManagement />} />
            <Route path="/settings/user-management" element={<UserManagement />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
