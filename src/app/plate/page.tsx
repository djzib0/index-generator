import PlateForm from '@/components/plateForm/PlateForm';
// styles import
import styles from "./platePage.module.css"


const PlatePage = () => {

  

  return (
    <div className={styles.platePageContainer}>
      <PlateForm />
    </div>
  )
}

export default PlatePage