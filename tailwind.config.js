/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './**/*.{html,md,markdown,liquid}',
    './_includes/**/*.{html,liquid}',
    './_layouts/**/*.{html,liquid}',
    './_posts/**/*.{md,markdown}',
    './blog/**/*.{html,md}',
    './projects/**/*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: 'hsl(240 5.9% 90%)',
        },
        input: 'hsl(240 5.9% 90%)',
        ring: 'hsl(240 4.9% 83.9%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(240 10% 3.9%)',
        primary: {
          DEFAULT: 'hsl(240 5.9% 10%)',
          foreground: 'hsl(0 0% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 5.9% 10%)',
        },
        muted: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 3.8% 46.1%)',
        },
        accent: {
          DEFAULT: 'hsl(240 4.8% 95.9%)',
          foreground: 'hsl(240 5.9% 10%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(240 10% 3.9%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)'
      },
    }
  },
  plugins: [require('@tailwindcss/typography')],
}
