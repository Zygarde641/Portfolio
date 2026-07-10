import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0c0c0c',
        hairline: '#1e1e1e',
        accent: '#ff3333',
        ember: '#7a1414',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
