import { addDynamicIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./docs/src/**/*.{html,js,css}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4f46e5",
                    dark: "#4338ca",
                },
            },
            fontFamily: {
                sans: ["Montserrat", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), addDynamicIconSelectors()],
};
