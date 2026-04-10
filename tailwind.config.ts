import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7c5454',
        secondary: '#556756',
        background: '#faf9f6',
        surface: '#faf9f6',
        'surface-container': '#efeeeb',
        'surface-container-low': '#f5f4f1',
        'surface-container-high': '#e8e7e2',
        'on-background': '#1a1c1a',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        outline: '#8a8d8a',
        'outline-variant': '#c4c7c4',
        error: '#ba1a1a',
        tertiary: '#d4a3a3',
        'primary-container': '#f8ecec',
        'secondary-container': '#d0e5cf',
      },
      fontFamily: {
        headline: ['Noto Serif', 'serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.5rem',
        xl: '1rem',
        full: '9999px',
      },
      boxShadow: {
        ambient: '0 12px 40px rgba(80, 68, 68, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
