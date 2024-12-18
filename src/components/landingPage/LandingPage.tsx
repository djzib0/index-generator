import Link from 'next/link'
// styles import
import styles from "./landingPage.module.css"

const LandingPage = () => {
  return (
    <div className={styles.contentContainer}>
      <section>
        <h1>Witaj w Generatorze Nazw Materiałów</h1>
        <p>
          To narzędzie pozwala szybko generować poprawne nazwy materiałów,
          zapewniając spójność i oszczędność cennego czasu.
        </p>
      </section>
      <hr className={styles.hr}/>
      <section>
        <h2>Funkcje:</h2>
        <ul>
          <li>Generowanie nazw dla poszczeglnych typów materiałów</li>
          <li>Możliwość kopiowania do schowka aby w szybki sposób skopiować do Graffiti</li>
        </ul>
      </section>
      <hr/>
      <section>
        <h2>
          Rozpocznij:
        </h2>
        <p>Aby rozpocząć kliknij przycisk poniżej lub wybierz z menu górnego:</p>
        <Link href={"/plate"}>[Blachy]</Link>
        <Link href={"/profile"}>[Profile]</Link>
        <Link href={"/other"}>[Pozostałe]</Link>
      </section>
    </div>
  )
}

export default LandingPage