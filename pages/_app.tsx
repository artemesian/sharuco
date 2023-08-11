import type { AppProps } from "next/app"
import { AuthContextProvider } from "@/context/AuthContext"
import GoogleAnalytics from "@bradgarropy/next-google-analytics"
import { Inter as FontSans } from "@next/font/google"
import { NextSeo } from "next-seo"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/toaster"
import "@/styles/globals.css"
import "prism-themes/themes/prism-one-dark.min.css"
//import "prism-themes/themes/prism-night-owl.css"
import { QueryClient, QueryClientProvider } from "react-query"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <NextSeo
            title="Sharuco"
            description="Share your code with everyone."
            canonical="https://sharuco.lndev.me/"
            openGraph={{
              url: "https://sharuco.lndev.me/",
              title: "Sharuco",
              description: "Share your code with everyone.",
              images: [
                {
                  url: "https://sharuco.lndev.me/sharuco-banner.png",
                  alt: "Sharuco",
                  type: "image/jpeg",
                  secureUrl: "https://sharuco.lndev.me/sharuco-banner.png",
                },
              ],
              siteName: "Sharuco",
            }}
            twitter={{
              handle: "@ln_dev7",
              site: "@ln_dev7",
              cardType: "summary_large_image",
            }}
          />
          <GoogleAnalytics measurementId="G-4FTGXMJNPY" />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Component {...pageProps} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </ThemeProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}
