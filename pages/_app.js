import '../styles/globals.css'
import { UserContext } from "/utils/contexts/userContext"
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
   const [USER, setUSER] = useState()

   return (
      <UserContext.Provider value={[USER, setUSER]}>
         <Component {...pageProps} />
      </UserContext.Provider>
   )
}

export default MyApp
