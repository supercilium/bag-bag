import Head from "next/head"
import { useRouter } from "next/router"

const Offer = () => {
  //   const router = useRouter()
  //   if (router.isFallback) {
  //     return <div>Loading category...</div>
  //   }

  return (
    <div>
      <Head>
        <title>Offer (ex)bags</title>
      </Head>
      <form>
        <input name="email" />
        <input name="password" type="password" />
      </form>
    </div>
  )
}

export default Offer
