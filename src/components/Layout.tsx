import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <main>
            <Outlet />
          </main>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Layout;
