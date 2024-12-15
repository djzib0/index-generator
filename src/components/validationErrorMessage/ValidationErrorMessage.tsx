import Image from 'next/image';
// styles import
import styles from "./validationErrorMessage.module.css"

const ValidationErrorMessage = ({message} : {message: string} ) => {
  return (
    <div className={styles.errorMessageContainer}>
      <Image alt='red icon with white x' src={"/erroricon.png"} width={30} height={30} />
      <p>{message}</p>
    </div>
  )
}

export default ValidationErrorMessage