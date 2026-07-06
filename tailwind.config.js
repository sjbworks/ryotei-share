/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './feature/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'loading-dot': {
          '0%, 80%, 100%': {
            backgroundColor: '#FFD4B3',
            transform: 'scale(1)',
          },
          '40%': {
            backgroundColor: '#FF8C42',
            transform: 'scale(1.35)',
          },
        },
      },
      animation: {
        'loading-dot': 'loading-dot 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
