import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pollution from "./pages/Pollution";
import Health from "./pages/Health";
import Physics from "./pages/Physics";
import Data from "./pages/Data";
import Solutions from "./pages/Solutions";
import BiologyLab from "./pages/BiologyLab";
import DataLab from "./pages/DataLab";
import ModelLab from "./pages/ModelLab";
import IGCSE from "./pages/IGCSE";
import IGCSEBiology from "./pages/IGCSEBiology";
import IGCSEChemistry from "./pages/IGCSEChemistry";
import IGCSEPhysics from "./pages/IGCSEPhysics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pollution" element={<Pollution />} />
            <Route path="/health" element={<Health />} />
            <Route path="/physics" element={<Physics />} />
            <Route path="/data" element={<Data />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/biology-lab" element={<BiologyLab />} />
            <Route path="/data-lab" element={<DataLab />} />
            <Route path="/model-lab" element={<ModelLab />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
