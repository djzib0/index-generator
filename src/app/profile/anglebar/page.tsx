import AnglebarForm from '@/components/forms/anglebarForm/AnglebarForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const AnglebarPage = () => {
  return (
    <Suspense fallback={<Loading />}>
        <AnglebarForm />
    </Suspense>
  )
}

export default AnglebarPage