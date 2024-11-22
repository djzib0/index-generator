import Link from 'next/link'
// styles import
import styles from "./profileNavbar.module.css"
import RoundbarShape from '../shapes/roundbarShape/RoundbarShape'
import PipeShape from '../shapes/pipe/PipeShape'
import SquareShape from '../shapes/square/SquareShape'
import ThreadedBarShape from '../shapes/threadedBarShape/ThreadedBarShape'
import HexagonShape from '../shapes/hexagonShape/HexagonShape'
import FlatbarShape from '../shapes/flatbarShape/FlatbarShape'


const ProfileNavbar = () => {
  return (
    <div className={styles.profileNavbarContainer}>
      <Link href={"/profile/roundbar"}>
        <RoundbarShape />
      </Link>
      <Link href={"/profile/pipe"}>
        <PipeShape />
      </Link>
      <Link href={"/profile/threaded"}>
        <ThreadedBarShape />
      </Link>
      <Link href={"/profile/hexagon"}>
        <HexagonShape />
      </Link>
      <Link href={"/profile/square"}>
        <SquareShape />
      </Link>
      <Link href={"/profile/flatbar"}>
        <FlatbarShape />
      </Link>

    </div>
  )
}

export default ProfileNavbar