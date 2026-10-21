"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  /** Nav over hero video — light icon on dark scrim */
  onHero?: boolean;
  isScrolled?: boolean;
  className?: string;
  lightLabel?: string;
  darkLabel?: string;
};

export function ThemeToggle({
  onHero = false,
  isScrolled = false,
  className = "",
  lightLabel = "Switch to light theme",
  darkLabel = "Switch to dark theme",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const heroStyle = onHero && !isScrolled;

  const iconClass = heroStyle
    ? "text-white/75 hover:text-white"
    : "text-muted-foreground hover:text-primary";

  if (!mounted) {
    return (
      <span
        className={`inline-flex h-9 w-9 items-center justify-center ${className}`}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`interactive-press inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${iconClass} ${className}`}
      aria-label={isDark ? lightLabel : darkLabel}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
