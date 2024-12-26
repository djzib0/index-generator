import CSectionForm from '@/components/forms/cSectionForm/CSectionForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const CSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CSectionForm materialGradesArr={jsxMaterialGradesArr}/>
    </Suspense>
  )
}

export default CSectionPage