import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Lunar Strategy colors
        lunar: {
          blue: "hsl(217 91% 60%)",
          dark: "hsl(0 0% 4%)",
          light: "hsl(0 0% 96%)",
        },
        // Section surface colors
        surface: {
          base: "hsl(var(--surface-base))",
          odd: "hsl(var(--surface-odd))",
          even: "hsl(var(--surface-even))",
        },
        // Colorful accent colors
        "accent-cyan": "hsl(var(--accent-cyan))",
        "accent-violet": "hsl(var(--accent-violet))",
        "accent-emerald": "hsl(var(--accent-emerald))",
        "accent-orange": "hsl(var(--accent-orange))",
        "accent-rose": "hsl(var(--accent-rose))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-md": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "25%": { transform: "scale(1.12) translate(-1.5%, 1%)" },
          "50%": { transform: "scale(1.2) translate(-3%, -2%)" },
          "75%": { transform: "scale(1.1) translate(1%, -1%)" },
          "100%": { transform: "scale(1) translate(0, 0)" },
        },
        "light-sweep": {
          "0%": { opacity: "0", transform: "translateX(-100%) rotate(-45deg)" },
          "50%": { opacity: "0.4" },
          "100%": { opacity: "0", transform: "translateX(100%) rotate(-45deg)" },
        },
        "aurora": {
          "0%, 100%": { opacity: "0.2", transform: "translateX(0) scale(1)" },
          "25%": { opacity: "0.35", transform: "translateX(8%) scale(1.08)" },
          "50%": { opacity: "0.25", transform: "translateX(-5%) scale(1.05)" },
          "75%": { opacity: "0.3", transform: "translateX(3%) scale(1.03)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        // Floating Island animations
        "floating-subtle": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-4px) rotate(0.2deg)" },
          "66%": { transform: "translateY(3px) rotate(-0.15deg)" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--primary) / 0.15), 0 0 40px hsl(var(--primary) / 0.1), inset 0 0 20px hsl(var(--primary) / 0.05)" 
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(var(--primary) / 0.25), 0 0 60px hsl(var(--primary) / 0.15), inset 0 0 30px hsl(var(--primary) / 0.08)" 
          },
        },
        "glow-line": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "particle-float": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-20px) scale(0)", opacity: "0" },
        },
        "ripple-out": {
          "0%": { transform: "scale(0.5)", opacity: "0.8" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-fade": {
          "0%": { opacity: "0", filter: "blur(8px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        "scroll-indicator": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(6px)", opacity: "0.5" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 20px 4px hsl(var(--primary) / 0.2)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slide-in-left 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "marquee": "marquee 20s linear infinite",
        "kenburns": "kenburns 12s ease-in-out infinite",
        "light-sweep": "light-sweep 4s ease-in-out infinite",
        "aurora": "aurora 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        // Floating Island animations
        "floating-subtle": "floating-subtle 5s ease-in-out infinite",
        "neon-pulse": "neon-pulse 3s ease-in-out infinite",
        "glow-line": "glow-line 3s ease-in-out infinite",
        "particle-float": "particle-float 0.6s ease-out forwards",
        "ripple-out": "ripple-out 0.6s ease-out forwards",
        // New micro-interaction animations
        "reveal-up": "reveal-up 0.6s ease-out forwards",
        "reveal-fade": "reveal-fade 0.8s ease-out forwards",
        "scroll-indicator": "scroll-indicator 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
