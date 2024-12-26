import PlateForm from '@/components/forms/plateForm/PlateForm';
// styles import
import styles from "./platePage.module.css"
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';
import {jsxMaterialGradesArr} from "@/lib/excelData"


const PlatePage = async () => {

  return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading />}>
        <PlateForm materialGradesArr={jsxMaterialGradesArr} />
      </Suspense>
    </div>
  )
}

export default PlatePage