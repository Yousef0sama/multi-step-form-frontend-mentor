
import Head from "next/head"

export const metadata = {
  title: 'multi step form main',
  description: 'multi step form main from front-end mentor by yousef osama',
  icons:{
    icon: "./icons/favicon.ico?v=4",
    apple: "./icons/apple-touch-icon.png?v=4",
    shortcut: "./icons/apple-touch-icon.png?v=4"
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
