import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/pollution", label: "Pollution" },
  { to: "/health", label: "Health" },
  { to: "/physics", label: "Physics" },
  { to: "/data", label: "Data" },
  { to: "/solutions", label: "Solutions" },
];

const labLinks = [
  { to: "/physics-lab", label: "⚛️ Physics Lab" },
  { to: "/chemistry-lab", label: "🧪 Chemistry Lab" },
  { to: "/biology-lab", label: "🧬 Biology Lab" },
  { to: "/data-lab", label: "📊 Data Lab" },
  { to: "/solution-sim", label: "🎛️ Solution Sim" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [labsOpen, setLabsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-4 left-0 right-0 z-50 px-6 lg:px-16"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="font-heading italic text-xl text-foreground tracking-wide">
          AirPollution
        </Link>

        {/* Center nav pill */}
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

        {/* Labs Dropdown */}
        <div className="relative">
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
