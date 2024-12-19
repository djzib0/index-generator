import { IoMenu } from "react-icons/io5";
// styles import
import styles from "./hamburgerMenu.module.css"

const HamburgerMenu = () => {
  return (
    <div>
      <button className={styles.menuBtn}>
        <IoMenu />
      </button>
    </div>
  )
}

export default HamburgerMenu