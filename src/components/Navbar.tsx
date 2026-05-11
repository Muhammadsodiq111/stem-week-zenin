import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/pollution", label: "Pollution" },
  { to: "/health", label: "Health" },
  { to: "/physics", label: "Physics" },
  { to: "/data", label: "Data" },
  { to: "/solutions", label: "Solutions" },
];

const labLinks = [
  { to: "/biology-lab", label: "🧬 Biology Lab" },
  { to: "/data-lab", label: "📊 Data Lab" },
  { to: "/model-lab", label: "🏭 Model Lab" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [labsOpen, setLabsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setLabsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-16"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="font-heading italic text-xl text-foreground tracking-wide z-50">
            AirPollution
          </Link>

          {/* Center nav pill — desktop */}
          <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-1.5 text-sm font-body font-medium rounded-full transition-colors duration-300 ${
                  pathname === link.to
                    ? "text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {pathname === link.to && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-foreground/90 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Labs Dropdown — desktop */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLabsOpen(!labsOpen)}
                onBlur={() => setTimeout(() => setLabsOpen(false), 200)}
                className={`liquid-glass-strong rounded-full px-5 py-2 text-sm font-body font-medium transition-colors ${
                  labLinks.some(l => l.to === pathname)
                    ? "bg-foreground/20 text-foreground"
                    : "text-foreground hover:bg-foreground/10"
                }`}
              >
                🔬 Labs
              </button>

              {labsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 liquid-glass-strong rounded-xl p-2 min-w-[200px]"
                >
                  {labLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2.5 text-sm font-body font-medium rounded-lg transition-colors ${
                        pathname === link.to
                          ? "bg-foreground/15 text-foreground"
                          : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden liquid-glass-strong rounded-full p-2.5 text-foreground z-50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col pt-24 px-8 pb-12 h-full overflow-y-auto">
              <div className="space-y-1 mb-8">
                <p className="text-foreground/30 font-body text-xs uppercase tracking-widest mb-4">Pages</p>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      className={`block py-3 px-4 rounded-xl text-lg font-body font-medium transition-colors ${
                        pathname === link.to
                          ? "bg-foreground/10 text-foreground"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-1">
                <p className="text-foreground/30 font-body text-xs uppercase tracking-widest mb-4">Interactive Labs</p>
                {labLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + i) * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      className={`block py-3 px-4 rounded-xl text-lg font-body font-medium transition-colors ${
                        pathname === link.to
                          ? "bg-foreground/10 text-foreground"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
