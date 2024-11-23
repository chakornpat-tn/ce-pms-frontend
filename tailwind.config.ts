import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
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
  			bg_primary: '#f9f9f9',
  			primary1: '#0F1035',
  			primary2: {
  				'100': '#C1D8FF',
  				'200': '#84ABEC',
  				'300': '#597DB9',
  				'400': '#365486',
  				'500': '#1B3053'
  			},
  			secondary1: '#DCF2F1',
  			secondary2: {
  				'100': '#7FC7D9',
  				'200': '#66A7B7',
  				'300': '#4E8795',
  				'400': '#396773',
  				'500': '#264851'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1B3053',
          'primary-focus': '#365486',
          'primary-content': '#ffffff',
          secondary: '#4E8795',
          'secondary-focus': '#396773',
          'secondary-content': '#ffffff',
          accent: '#84ABEC',
          neutral: '#0F1035',
          'base-100': '#f9f9f9',
          'base-content': '#0F1035',
          info: '#C1D8FF',
          success: '#7FC7D9',
          warning: '#597DB9',
          error: '#264851',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require("tailwindcss-animate")],
}
export default config
