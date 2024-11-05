import Link from 'next/link'
// styles import
import styles from "./navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div>Index generator</div>
      <div className={styles.navbarLinksContainer}>
        <div className={styles.navbarLink}>
          <Link href={"/"}>Home</Link>
        </div>
        <div className={styles.navbarLink}>
          <Link href={"/plate"}>Blachy</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar