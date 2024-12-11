import TeeForm from '@/components/forms/teeForm/TeeForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const TeePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TeeForm />
    </Suspense>
  )
}

export default TeePage