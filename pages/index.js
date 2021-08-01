import Header from "/components/out/header"
import Main from "/components/out/main"
import TextBox from "../components/out/textbox"
import UserFeedback from "../components/out/userfeedback"

export default function Home() {
  return (
    <div className="mb-10">
      <Header/>
      <div className="font-body container mx-auto px-5 lg:px-10 flex flex-col gap-10 lg:gap-20">
        <Main/>
        <TextBox/>
        <UserFeedback/>
      </div>
    </div>
  )
}
