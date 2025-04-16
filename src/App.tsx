import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AqiPage from "./pages/AqiPage";
import NewsPage from "./pages/NewsPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import CampaignsPage from "./pages/CampaignsPage";
import CalculatorPage from "./pages/CalculatorPage";
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
          <Route path="/aqi" element={<AqiPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
