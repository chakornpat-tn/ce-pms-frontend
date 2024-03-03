import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        bg_primary: '#F1F5F9',
        primary1: '#0F1035',
        primary2: {
          500: '#1B3053',
          400: '#365486',
          300: '#597DB9',
          200: '#84ABEC',
          100: '#C1D8FF',
        },
        secondary1: '#DCF2F1',
        secondary2: {
          500: '#264851',
          400: '#396773',
          300: '#4E8795',
          200: '#66A7B7',
          100: '#7FC7D9',
        },
      },
    },
  },
  plugins: [],
}
export default config
