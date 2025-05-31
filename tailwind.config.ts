// tailwind.config.ts
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#14B8A6',
          'primary-hover': '#0D9488',
          'primary-light': '#CCFBF1',
          'secondary': '#F97316',
          'secondary-hover': '#EA580C',
          'background': '#F8FAFC',   // Slate-50 untuk light mode background
          'surface': '#FFFFFF',     // Putih untuk card/surface di light mode
          'text': '#0F172A',         // Slate-900
          'muted': '#64748B',       // Slate-500
          'border': '#E2E8F0',      // Slate-200
        },
        'dark-brand': {
          'primary': '#2DD4BF',
          'primary-hover': '#14B8A6',
          'primary-light': '#115E59',
          'secondary': '#FB923C',
          'secondary-hover': '#F97316',
          'background': '#0B141F',  // Custom dark background
          'surface': '#1E293B',     // Slate-800 untuk card/surface di dark mode
          'text': '#E2E8F0',         // Slate-200
          'muted': '#94A3B8',       // Slate-400
          'border': '#334155',      // Slate-700
        }
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'custom-soft': '0 4px 15px -2px rgba(0, 0, 0, 0.06), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pop-in': 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'subtle-bounce': 'subtleBounce 2.5s infinite ease-in-out'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0'}, '100%': { transform: 'translateY(0)', opacity: '1'} },
        popIn: { '0%': { transform: 'scale(0.95)', opacity: '0'}, '100%': { transform: 'scale(1)', opacity: '1'} },
        subtleBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        }
      }
    },
  },
  plugins: [
    forms({
      strategy: 'class', 
    }),
  ],
};
export default config;