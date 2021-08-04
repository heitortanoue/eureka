import Header from "/components/out/header"
import Main from "/components/out/main"
import TextBox from "../components/out/textbox"
import UserFeedback from "../components/out/userfeedback"
import Footer from "../components/out/footer"
import Container from "../components/global/container"
import Head from "next/head"

export default function Home() {
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
