import Header from "/components/out/header"
import Main from "/components/out/main"
import TextBox from "../components/out/textbox"
import UserFeedback from "../components/out/userfeedback"
import Footer from "../components/out/footer"
import Head from "next/head"
import RedirectWhenLogged from "../utils/redirectWhenLogged"

export default function Home() {
  return (
    <>
      <RedirectWhenLogged/>
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
