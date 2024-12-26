import BeamForm from '@/components/forms/beamForm/BeamForm'
import Loading from '@/components/loading/Loading'
import { jsxMaterialGradesArr } from '@/lib/excelData'
import React, { Suspense } from 'react'

const BeamPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BeamForm materialGradesArr={jsxMaterialGradesArr}/>
    </Suspense>
  )
}

export default BeamPage