import RoundbarForm from "@/components/forms/roundbarForm/RoundbarForm"
import Loading from "@/components/loading/Loading"
import { Suspense } from "react"


const RoundbarPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RoundbarForm />
      </Suspense>
    </div>
  )
}

export default RoundbarPage