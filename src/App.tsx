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
import AdminLayout from "@/components/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminFaculty from "./pages/admin/AdminFaculty";
import AdminAccounts from "./pages/admin/AdminAccounts";
import AdminContent from "./pages/admin/AdminContent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { lang, setLang } = useLang();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with layout */}
        <Route element={<Layout lang={lang} setLang={setLang}><></></Layout>}>
          {/* Workaround: use individual route wrappers */}
        </Route>

        {/* Public pages */}
        <Route path="/" element={<Layout lang={lang} setLang={setLang}><IndexPage lang={lang} /></Layout>} />
        <Route path="/faculty" element={<Layout lang={lang} setLang={setLang}><FacultyPage lang={lang} /></Layout>} />
        <Route path="/faculty/:id" element={<Layout lang={lang} setLang={setLang}><FacultyDetailPage lang={lang} /></Layout>} />
        <Route path="/about" element={<Layout lang={lang} setLang={setLang}><AboutPage lang={lang} /></Layout>} />
        <Route path="/contact" element={<Layout lang={lang} setLang={setLang}><ContactPage lang={lang} /></Layout>} />
        <Route path="/login" element={<Layout lang={lang} setLang={setLang}><LoginPage lang={lang} /></Layout>} />

        {/* Admin dashboard routes */}
        <Route path="/dashboard" element={<AdminLayout lang={lang} />}>
          <Route index element={<AdminOverview lang={lang} />} />
          <Route path="faculty" element={<AdminFaculty lang={lang} />} />
          <Route path="accounts" element={<AdminAccounts lang={lang} />} />
          <Route path="content" element={<AdminContent lang={lang} />} />
        </Route>

        <Route path="*" element={<Layout lang={lang} setLang={setLang}><NotFound /></Layout>} />
      </Routes>
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
