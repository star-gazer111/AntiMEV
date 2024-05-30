import { card, shield } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import shieldvid from "../assets/shieldvid.mp4";

const AboutUs = () => (
  <section
    id="product"
    className={layout.section}
    style={{ marginTop: "40px" }}
  >
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2} style={{ marginTop: "40px" }}>
        Who are we? What we do? <br className="sm:block hidden" />
      </h2>
      <p className={`${styles.paragraph} max-w-[800px] mt-5`}>
        We are MEVspy, a pioneering team dedicated to enhancing blockchain
        security.We specialize in detecting and classifying Maximum Extractable
        Value (MEV) transactions within blockchain networks. Our flagship
        solution, ArbiNet, offers unmatched accuracy and efficiency in MEV
        detection, revolutionizing blockchain security.
      </p>
    </div>

    <div className={layout.sectionImg}>
      <video autoPlay loop muted style={{ width: "45%", height: "auto" }}>
        <source src={shieldvid} type="video/mp4" />
      </video>
    </div>
  </section>
);

export default AboutUs;
