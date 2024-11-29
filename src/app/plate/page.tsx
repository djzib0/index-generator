import PlateForm from '@/components/forms/plateForm/PlateForm';
// styles import
import styles from "./platePage.module.css"


const PlatePage = () => {

  

  return (
    <div className={styles.pageContainer}>
      <PlateForm />
    </div>
  )
}

export default PlatePage