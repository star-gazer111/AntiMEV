import styles from "./style";
import {
  ClientDashboard,
  Business,
  AboutUs,
  CTA,
  Navbar,
  Stats,
  Insights,
  Hero,
} from "./components";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Stats />
        <Business />
        <ClientDashboard />
        <AboutUs />
        <Insights />
        <CTA />
      </div>
    </div>
  </div>
);

export default App;
