/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { poppins: ["Poppins"] },
    extend: {
      keyframes: {
        growWidth: {
          "0%": { width: 0 },
          "10%": { width: "10%" },
          "20%": { width: "20%" },
          "30%": { width: "30%" },
          "40%": { width: "40%" },
          "50%": { width: "50%" },
          "60%": { width: "60%" },
          "70%": { width: "70%" },
          "80%": { width: "80%" },
          "90%": { width: "90%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "grow-width": "growWidth 5s linear",
      },
    },
  },
  plugins: [],
};
