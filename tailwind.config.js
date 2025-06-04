/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gray: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#333333',
          500: '#4a4a4a',
          400: '#666666',
          300: '#9a9a9a',
          200: '#c4c4c4',
          100: '#e0e0e0',
          50: '#f5f5f5',
        },
        primary: {
          900: '#003e51',
          800: '#00516b',
          700: '#006785',
          600: '#007d9e',
          500: '#0094b8',
          400: '#00abd1',
          300: '#00c2ea',
          200: '#00d9ff',
          100: '#00e5ff', // Main cyan accent
          50: '#b3f5ff',
        },
        success: {
          900: '#004d2d',
          800: '#006439',
          700: '#007c45',
          600: '#009351',
          500: '#00aa5e',
          400: '#00c16a',
          300: '#00d876',
          200: '#00ef83',
          100: '#00ff9d', // Main green accent
          50: '#b3ffda',
        },
        warning: {
          900: '#4d3800',
          800: '#664a00',
          700: '#7f5c00',
          600: '#996e00',
          500: '#b28000',
          400: '#cc9200',
          300: '#e5a400',
          200: '#ffb700',
          100: '#ffc333',
          50: '#ffe4b3',
        },
        error: {
          900: '#4d0012',
          800: '#660018',
          700: '#7f001e',
          600: '#990024',
          500: '#b2002a',
          400: '#cc0030',
          300: '#e50036',
          200: '#ff003c',
          100: '#ff3363',
          50: '#ffb3c6',
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(0, 229, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
          },
        },
      },
      animation: {
        pulse: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      backgroundImage: {
        'cyber-pattern': "url('https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        'cyber-grid': "url('https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
    },
  },
  plugins: [],
};