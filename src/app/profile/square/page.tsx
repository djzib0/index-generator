import SquareForm from '@/components/forms/squareForm/SquareForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const SquarePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SquareForm materialGradesArr={jsxMaterialGradesArr} />
    </Suspense>
  )
}

export default SquarePage