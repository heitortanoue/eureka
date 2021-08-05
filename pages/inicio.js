function Inicio ({ questions }) {

}

export async function getServerSideProps () {
    const questions = await getMoreQuestions()
    return {
      props: { questions },
    }
  }