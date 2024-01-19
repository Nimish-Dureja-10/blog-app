import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Blog Site</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
          Facere eius animi vel eum commodi autem reiciendis, blanditiis
          eveniet repudiandae repellendus!
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn More</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image src={"/brands.png"} alt="Brand_images" fill className={styles.brandImg} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src={"/hero.gif"} alt="Hero_image" fill className={styles.heroImg} />
      </div>
    </div>
  )
}

export default Home;