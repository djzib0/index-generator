import AnglebarForm from '@/components/forms/anglebarForm/AnglebarForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const AnglebarPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <AnglebarForm materialGradesArr={jsxMaterialGradesArr}/>
    </Suspense>
  )
}

export default AnglebarPage