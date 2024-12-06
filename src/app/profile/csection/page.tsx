import CSectionForm from '@/components/forms/cSectionForm/CSectionForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const CSectionPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CSectionForm />
    </Suspense>
  )
}

export default CSectionPage