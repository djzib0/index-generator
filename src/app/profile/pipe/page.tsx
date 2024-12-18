import PipeForm from '@/components/forms/pipeForm/PipeForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const PipePage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PipeForm />
      </Suspense>
    </div>
  )
}

export default PipePage