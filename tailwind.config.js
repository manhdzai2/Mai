import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Bật Dark Mode qua class 'dark' ở body
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
              "secondary": "#4edea3",
              "on-primary-fixed-variant": "#3323cc",
              "tertiary-fixed-dim": "#ffb2b7",
              "on-primary-fixed": "#0f0069",
              "surface-container-high": "#222a3d",
              "on-tertiary-fixed-variant": "#92002a",
              "tertiary-fixed": "#ffdadb",
              "primary-fixed-dim": "#c3c0ff",
              "surface-tint": "#c3c0ff",
              "primary": "#c3c0ff",
              "on-secondary-fixed-variant": "#005236",
              "tertiary-container": "#bf0f3c",
              "surface": "#0b1326",
              "on-surface": "#dae2fd",
              "secondary-container": "#00a572",
              "on-error": "#690005",
              "inverse-surface": "#dae2fd",
              "inverse-primary": "#4d44e3",
              "on-surface-variant": "#c7c4d8",
              "error": "#ffb4ab",
              "outline": "#918fa1",
              "surface-container": "#171f33",
              "on-error-container": "#ffdad6",
              "secondary-fixed-dim": "#4edea3",
              "on-secondary-container": "#00311f",
              "on-secondary": "#003824",
              "on-primary-container": "#dad7ff",
              "on-tertiary": "#67001b",
              "surface-container-highest": "#2d3449",
              "on-background": "#dae2fd",
              "surface-bright": "#31394d",
              "outline-variant": "#464555",
              "on-secondary-fixed": "#002113",
              "on-tertiary-container": "#ffd0d2",
              "secondary-fixed": "#6ffbbe",
              "surface-container-lowest": "#060e20",
              "primary-fixed": "#e2dfff",
              "surface-variant": "#2d3449",
              "inverse-on-surface": "#283044",
              "surface-container-low": "#131b2e",
              "primary-container": "#4f46e5",
              "tertiary": "#ffb2b7",
              "error-container": "#93000a",
              "on-primary": "#1d00a5",
              "background": "#0b1326",
              "on-tertiary-fixed": "#40000d",
              "surface-dim": "#0b1326"
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                headline: ["Inter"],
                body: ["Inter"],
                label: ["Inter"]
            },
            borderRadius: {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(15px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }
        },
    },

    plugins: [forms],
};
