import BeamForm from '@/components/forms/beamForm/BeamForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const BeamPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BeamForm />
    </Suspense>
  )
}

export default BeamPage