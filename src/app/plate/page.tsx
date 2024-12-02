import PlateForm from '@/components/forms/plateForm/PlateForm';
// styles import
import styles from "./platePage.module.css"
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';


const PlatePage = () => {

  

  return (
    <div className={styles.pageContainer}>
      <Suspense fallback={<Loading />}>
        <PlateForm />
      </Suspense>
    </div>
  )
}

export default PlatePage