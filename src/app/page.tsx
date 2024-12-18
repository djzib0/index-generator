import LandingPage from "@/components/landingPage/LandingPage";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <LandingPage />
    </div>
  );
}
