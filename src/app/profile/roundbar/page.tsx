import RoundbarForm from "@/components/forms/roundbarForm/RoundbarForm"
import Loading from "@/components/loading/Loading"
import { Suspense } from "react";
import { jsxMaterialGradesArr } from "@/lib/excelData";


const RoundbarPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RoundbarForm materialGradesArr={jsxMaterialGradesArr} />
      </Suspense>
    </div>
  )
}

export default RoundbarPage