'use client' 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// styles import
import styles from "./navbar.module.css"


const Navbar = () => {
  
  const pathName = usePathname();

  return (
    <nav className={styles.navbar}>
      <div>Index generator</div>
      <div className={styles.navbarLinksContainer}>
        <div className={`${styles.navbarLink} ${pathName === "/" && styles.activeLink}`}>
          <Link href={"/"}>Home</Link>
        </div>
        <div className={`${styles.navbarLink} ${pathName.includes("/plate") && styles.activeLink}`}>
          <Link href={"/plate"}>Blachy</Link>
        </div>
        <div className={`${styles.navbarLink} ${pathName.includes("/profile") && styles.activeLink}`}>
          <Link href={"/profile"}>Profile</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar