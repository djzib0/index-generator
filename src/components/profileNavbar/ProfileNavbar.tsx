import Link from 'next/link'
// styles import
import styles from "./profileNavbar.module.css"
import RoundbarShape from '../shapes/roundbarShape/RoundbarShape'
import PipeShape from '../shapes/pipeShape/PipeShape'
import SquareShape from '../shapes/squareShape/SquareShape'
import ThreadedBarShape from '../shapes/threadedBarShape/ThreadedBarShape'
import HexagonShape from '../shapes/hexagonShape/HexagonShape'
import FlatbarShape from '../shapes/flatbarShape/FlatbarShape'
import AnglebarShape from '../shapes/anglebar/AnglebarShape'
import CSectionShape from '../shapes/cSectionShape/CSectionShape'
import TeeShape from '../shapes/teeShape/TeeShape'


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
      <Link href={"/profile/anglebar"}>
        <AnglebarShape />
      </Link>
      <Link href={"/profile/csection"}>
        <CSectionShape />
      </Link>
      <Link href={"/profile/tee"}>
        <TeeShape />
      </Link>
      

    </div>
  )
}

export default ProfileNavbar