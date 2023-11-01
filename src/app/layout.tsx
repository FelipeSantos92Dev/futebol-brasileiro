import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Futebol Brasileiro',
  description: 'Tudo sobre os times brasileiros'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
