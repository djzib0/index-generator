import TeeForm from '@/components/forms/teeForm/TeeForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const TeePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TeeForm materialGradesArr={jsxMaterialGradesArr}/>
    </Suspense>
  )
}

export default TeePage