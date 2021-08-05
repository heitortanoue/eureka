import Header from "/components/out/header"
import Main from "/components/out/main"
import TextBox from "../components/out/textbox"
import UserFeedback from "../components/out/userfeedback"
import Footer from "../components/out/footer"
import Container from "../components/global/container"
import Head from "next/head"
import { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { getCookie } from "../utils/cookie"
import axios from "axios"
import { UserContext } from "/utils/contexts/userContext"

export default function Home() {
  const router = useRouter()
  const userContext = useContext(UserContext)

  useEffect(() => {
    const token = getCookie("token")
    if (token) {
      axios.post("/api/usuarioLogin", {token: token})
      .then(function (response) {
        userContext[1](response.data.user)
        console.log(response);
      })
      router.push("/inicio")
    }
  }, [])

  return (
    <>
    <Head>
      <title>Eureka</title>
    </Head>
    <div className="font-body">
      <div className="mb-32">
        <Header/>
        <Container>
          <Main/>
          <TextBox/>
          <UserFeedback/>
        </Container>
      </div>
      <Footer/>
    </div>
    </>
  )
}
