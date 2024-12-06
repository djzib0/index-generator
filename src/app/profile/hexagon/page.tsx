import HexagonForm from '@/components/forms/hexagonForm/HexagonForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const HexagonPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <HexagonForm />
    </Suspense>
  )
}

export default HexagonPage