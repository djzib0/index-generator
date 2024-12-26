import HexagonForm from '@/components/forms/hexagonForm/HexagonForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const HexagonPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <HexagonForm materialGradesArr={jsxMaterialGradesArr} />
    </Suspense>
  )
}

export default HexagonPage