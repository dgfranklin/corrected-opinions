/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#226E93',
          50: '#89C6E4',
          100: '#78BEE0',
          200: '#57AED8',
          300: '#369ED1',
          400: '#2A87B4',
          00: '#226E93',
          600: '#174C65',
          700: '#0D2A38',
          800: '#02080A',
          900: '#000000',
          950: '#000000'
        },
      }
    },
  },
  plugins: [],
}
