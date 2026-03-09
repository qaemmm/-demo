/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#6C3CE1',
        accent: '#F5A623',
        userBg: '#F8F6FF',
        adminPositive: '#10B981',
        adminWarning: '#F59E0B',
      },
      boxShadow: {
        card: '0 10px 30px rgba(16, 24, 40, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-soft': 'pulseSoft 1.2s ease-in-out infinite',
        rise: 'rise 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.95)' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-24px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
