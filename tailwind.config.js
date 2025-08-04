module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // or your relevant paths
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        stock: "var(--stock)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-manrope)", "monospace"],
      },
    },
  },
  plugins: {
        tailwindcss: {},
        
      },
};

