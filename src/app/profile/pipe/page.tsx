import PipeForm from '@/components/forms/pipeForm/PipeForm'
import Loading from '@/components/loading/Loading'
import React, { Suspense } from 'react';
import { jsxMaterialGradesArr } from '@/lib/excelData';

const PipePage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PipeForm materialGradesArr={jsxMaterialGradesArr}/>
      </Suspense>
    </div>
  )
}

export default PipePage