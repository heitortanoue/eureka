import Header from "/components/out/header"
import Main from "/components/out/main"
import TextBox from "../components/out/textbox"
import UserFeedback from "../components/out/userfeedback"
import Footer from "../components/out/footer"
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
        <div className={`font-body container mx-auto px-5 lg:px-10 flex flex-col gap-20 p-5 md:p-10`}>
          <Main/>
          <TextBox/>
          <UserFeedback/>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  )
}
