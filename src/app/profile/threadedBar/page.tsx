import ThreadedBarForm from '@/components/forms/threadedBarForm/ThreadedBarForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialClassesArr, jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const ThreadedBarPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ThreadedBarForm 
          materialGradesArr={jsxMaterialGradesArr}
          materialClassesArr={jsxMaterialClassesArr}
        />
      </Suspense>
    </div>
  )
}

export default ThreadedBarPage