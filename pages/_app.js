import '../styles/globals.css'
import { UserContext } from "/utils/contexts/userContext"
import { useState } from 'react'
import { Router } from 'next/dist/client/router'
import nProgress from 'nprogress'
import "/styles/nprogress.css"

nProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => {
   nProgress.start()
})
Router.events.on("routeChangeComplete", () => {
   nProgress.done()
})
Router.events.on("routeChangeError", () => {
   nProgress.done()
})

function MyApp({ Component, pageProps }) {
   const [USER, setUSER] = useState()

   return (
      <UserContext.Provider value={[USER, setUSER]}>
         <Component {...pageProps} />
      </UserContext.Provider>
   )
}

export default MyApp
