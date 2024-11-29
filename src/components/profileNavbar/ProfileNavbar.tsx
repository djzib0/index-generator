import Link from 'next/link'
// styles import
import styles from "./profileNavbar.module.css"
import RoundbarShape from '../profiles/roundbarShape/RoundbarShape'
import PipeShape from '../profiles/pipeShape/PipeShape'
import SquareShape from '../profiles/squareShape/SquareShape'
import ThreadedBarShape from '../profiles/threadedBarShape/ThreadedBarShape'
import HexagonShape from '../profiles/hexagonShape/HexagonShape'
import FlatbarShape from '../profiles/flatbarShape/FlatbarShape'
import AnglebarShape from '../profiles/anglebarShape/AnglebarShape'
import CSectionShape from '../profiles/cSectionShape/CSectionShape'
import TeeShape from '../profiles/teeShape/TeeShape'
import BeamShape from '../profiles/beamShape/BeamShape'


const ProfileNavbar = () => {
  return (
    <div className={styles.profileNavbarContainer}>
      <h4>Wybierz profil</h4>
      <div className={styles.profilesIcons}>
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
      <Link href={"/profile/beam"}>
        <BeamShape />
      </Link>
      </div>
    </div>
  )
}

export default ProfileNavbar