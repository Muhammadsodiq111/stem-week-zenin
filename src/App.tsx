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
import PhysicsLab from "./pages/PhysicsLab";
import ChemistryLab from "./pages/ChemistryLab";
import BiologyLab from "./pages/BiologyLab";
import DataLab from "./pages/DataLab";
import SolutionSim from "./pages/SolutionSim";
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
            <Route path="/physics-lab" element={<PhysicsLab />} />
            <Route path="/chemistry-lab" element={<ChemistryLab />} />
            <Route path="/biology-lab" element={<BiologyLab />} />
            <Route path="/data-lab" element={<DataLab />} />
            <Route path="/solution-sim" element={<SolutionSim />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
