/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        spoqa: ['"Spoqa Han Sans"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.01em', // 사용자 지정 이름 (tracking-tighter)
      },
      lineHeight: {
        relaxed16: '24px', // 사용자 지정 이름 (leading-relaxed16)
      },
    },
  },
  plugins: [],
}

