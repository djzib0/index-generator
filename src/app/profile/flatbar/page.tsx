import FlatbarForm from '@/components/forms/flatbarForm/FlatbarForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const FlatbarPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <FlatbarForm materialGradesArr={jsxMaterialGradesArr}/>
    </Suspense>
  )
}

export default FlatbarPage