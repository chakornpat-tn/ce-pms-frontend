'use client'
import { Prompt } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  variable: '--my-font-family',
})

const theme = createTheme({
  typography: {
    fontFamily: prompt.style.fontFamily,
  },
})

export default theme
