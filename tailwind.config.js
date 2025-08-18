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
        primaryLight: "#f8eafb",
        secondary: "var(--secondary)",
        stock: "var(--stock)",
        gray: "var(--gray)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-manrope)", "monospace"],
      },
      borderRadius: {
        radius: "var(--radius)", // <-- add this line
      },
    },
  },
  plugins: {
        tailwindcss: {},
        
      },
};