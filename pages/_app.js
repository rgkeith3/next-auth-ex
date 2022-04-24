import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import '../styles/globals.css'

const queryClient = new QueryClient

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default MyApp
