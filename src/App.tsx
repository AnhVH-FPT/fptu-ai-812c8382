import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import Layout from "@/components/Layout";
import IndexPage from "./pages/Index";
import FacultyPage from "./pages/Faculty";
import FacultyDetailPage from "./pages/FacultyDetail";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { lang, setLang } = useLang();

  return (
    <BrowserRouter>
      <Layout lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<IndexPage lang={lang} />} />
          <Route path="/faculty" element={<FacultyPage lang={lang} />} />
          <Route path="/faculty/:id" element={<FacultyDetailPage lang={lang} />} />
          <Route path="/about" element={<AboutPage lang={lang} />} />
          <Route path="/contact" element={<ContactPage lang={lang} />} />
          <Route path="/login" element={<LoginPage lang={lang} />} />
          <Route path="/dashboard" element={<DashboardPage lang={lang} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
