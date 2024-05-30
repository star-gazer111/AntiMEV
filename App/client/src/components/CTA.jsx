import styles from "../style";
import Button from "./Button";
import { mevspyLogo } from "../assets";

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
  >
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Let’s try our service now!</h2>
      <p className={`${styles.paragraph} max-w-[470px]`}>
        All you need to do is connect your wallet, paste your transaction hash,
        and we’ll take care of the rest.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <img src={mevspyLogo} alt="logo" className="w-[240px] h-[80px]" />
    </div>
  </section>
);

export default CTA;
