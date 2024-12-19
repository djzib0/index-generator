'use client' 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// styles import
import styles from "./navbar.module.css"
// import HamburgerMenu from './hamburgerMenu/HamburgerMenu'
// import { IoMenu } from "react-icons/io5";
import { useState } from 'react';

const Navbar = () => {

  const pathName = usePathname();

  const [isHamburgerMenuOpened, setIsHamburgerMenuOpened] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.verticalNavbar}>
        <div>Index name generator</div>
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
          <div className={`${styles.navbarLink} ${pathName.includes("/other") && styles.activeLink}`}>
            <Link href={"/other"}>Inne</Link>
          </div>
        </div>
        <div className={styles.menuBtnContainer}>
          <button 
            id="menuButton" 
            type="button" 
            className={`${styles["menuButton"]} ${isHamburgerMenuOpened && styles["isOpened"]}`} 
            aria-labelledby="menuButtonLabel"
            onClick={() => setIsHamburgerMenuOpened(prevState => !prevState)}
            >
            <span className={styles.menuButtonLine}></span>
          </button>
        </div>
      </div>
      {isHamburgerMenuOpened && 
        <div className={styles.horizontalNavbar}>
          <Link href={"/"} className={`${styles.navbarLink} ${pathName === "/" && styles.activeLink}`}>Home</Link>
          <Link href={"/plate"} className={`${styles.navbarLink} ${pathName === "/" && styles.activeLink}`}>Blachy</Link>
          <Link href={"/profile"} className={`${styles.navbarLink} ${pathName === "/" && styles.activeLink}`}>Profile</Link>
          <Link href={"/other"} className={`${styles.navbarLink} ${pathName === "/" && styles.activeLink}`}>Inne</Link>
        </div>
      }
    </nav>
  )
}

export default Navbar