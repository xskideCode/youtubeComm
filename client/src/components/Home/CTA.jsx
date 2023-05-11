import styles from "../../style"
import Button from "./Button"

const CTA = () =>(
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow md:mx-0 mx-2`}>
      <div className="flex-1 flex flex-col">
        <h2 className={`${styles.heading2}`}>Join our Discord community</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Come join our Discord server! We're a welcoming community of small YouTube channels who support and help each other grow.</p>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button />
      </div>
    </section>
)


export default CTA