import ThreadedBarForm from '@/components/forms/threadedBarForm/ThreadedBarForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react'

const ThreadedBarPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ThreadedBarForm />
      </Suspense>
    </div>
  )
}

export default ThreadedBarPage