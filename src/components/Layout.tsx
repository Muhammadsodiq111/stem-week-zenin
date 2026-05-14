import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <main>
            <Outlet />
          </main>
        </PageTransition>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
