/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5F6F5',
        card: '#FFFFFF',
        ink: '#0E1211',
        ink2: '#6B7671',
        ink3: '#A2ABA6',
        line: '#E4E8E5',
        accent: '#127A4B',
        accentBg: '#E9F4EE',
        warn: '#B8492F',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        sheet: '24px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(14, 18, 17, 0.04)',
        sheet: '0 -8px 40px rgba(14, 18, 17, 0.16)',
        bar: '0 -1px 0 #E4E8E5',
      },
      fontSize: {
        label: ['9px', { lineHeight: '12px', letterSpacing: '0.16em' }],
        label2: ['10px', { lineHeight: '13px', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
}
