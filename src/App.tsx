import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import Layout from "@/components/Layout";
import IndexPage from "./pages/Index";
import FacultyPage from "./pages/Faculty";
import FacultyDetailPage from "./pages/FacultyDetail";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
