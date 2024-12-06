import FlatbarForm from '@/components/forms/flatbarForm/FlatbarForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const FlatbarPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <FlatbarForm />
    </Suspense>
  )
}

export default FlatbarPage