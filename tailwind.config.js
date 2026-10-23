/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale SIXORIA — Bleu royal (remplace forest)
        forest: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#1E56A0',   // Bleu logo SIXORIA
          700: '#1A4785',
          800: '#153369',
          900: '#0E2147',
          950: '#071228',
        },
        // Or — inchangé
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#C9922A',   // Or logo SIXORIA
          600: '#B07D1E',
          700: '#926618',
          800: '#764F12',
          900: '#5B3A0C',
        },
        cream: {
          50: '#F8FAFF',   // Fond légèrement bleuté
          100: '#EEF4FF',
          200: '#DCE8FF',
          300: '#C0D4FF',
          400: '#9DB8F5',
          500: '#7A9CE8',
        },
        terracotta: {
          50: '#fdf2ef',
          100: '#fbe4de',
          200: '#f6c9bc',
          300: '#eda18a',
          400: '#e07258',
          500: '#c85a3e',
          600: '#a84530',
          700: '#8a3426',
          800: '#6e281e',
          900: '#561f18',
        },
        sage: {
          50: '#f0f7ff',
          100: '#e0eeff',
          200: '#b9d9ff',
          300: '#7dbcff',
          400: '#3a9af0',
          500: '#1879D4',
          600: '#1462B0',
          700: '#114C8C',
          800: '#0E3A6B',
          900: '#0A2A4E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-right': 'slideRight 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-sixoria': 'linear-gradient(135deg, #0E2147 0%, #153369 50%, #1A4785 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9922A 0%, #fbbf24 100%)',
        'gradient-hero': 'linear-gradient(135deg, #07122B 0%, #0E2147 40%, #153369 70%, #1A4785 100%)',
      },
    },
  },
  plugins: [],
}
