import SquareForm from '@/components/forms/squareForm/SquareForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const SquarePage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <SquareForm />
    </Suspense>
  )
}

export default SquarePage