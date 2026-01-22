import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import { isIOSDevice } from "@/lib/platform";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // iOS (iPhone): aplica um “modo leve” via classe global para desativar filtros/glows pesados.
    // Importante: somente mobile (breakpoint do hook useIsMobile).
    const apply = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < 768;
      const enabled = isMobile && isIOSDevice();
      document.documentElement.classList.toggle("ios-mobile", enabled);
    };

    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  useEffect(() => {
    // Aguardar o DOM estar pronto e recursos básicos carregados
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      // Pequeno delay para garantir que React terminou de renderizar
      setTimeout(handleLoad, 100);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingScreen isLoading={isLoading} minDuration={2000} />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
