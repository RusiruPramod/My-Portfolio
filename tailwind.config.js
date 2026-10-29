/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#010409',
          900: '#020617',
          850: '#030b1f',
          800: '#071530',
          700: '#0d224d',
        },
        cyan: {
          DEFAULT: '#00e5ff',
          neon: '#00e5ff',
          bright: '#38bdf8',
          glow: 'rgba(0, 229, 255, 0.4)',
          dim: 'rgba(0, 229, 255, 0.12)',
        },
        hud: {
          blue: '#1e90ff',
          purple: '#a855f7',
          amber: '#f59e0b',
          emerald: '#10b981',
          border: 'rgba(0, 229, 255, 0.25)',
          surface: 'rgba(7, 21, 48, 0.55)',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-sm': '0 0 10px rgba(0, 229, 255, 0.2)',
        'cyan-md': '0 0 20px rgba(0, 229, 255, 0.35)',
        'cyan-lg': '0 0 35px rgba(0, 229, 255, 0.5)',
        'cyan-inner': 'inset 0 0 15px rgba(0, 229, 255, 0.25)',
        'blue-glow': '0 0 25px rgba(30, 144, 255, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-ping': 'glow-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'glow-ping': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '75%, 100%': { transform: 'scale(1.5)', opacity: '0' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};

