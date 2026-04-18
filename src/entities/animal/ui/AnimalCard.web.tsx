import type { Animal } from '../model/types'
import styles from './AnimalCard.module.css'

interface Props {
    animal: Animal
}

export const AnimalCard = ({ animal }: Props) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={animal.image} className={styles.image} />

                <div className={styles.overlay} />

                <div className={styles.nameBlock}>
                    <span className={styles.name}>{animal.name}</span>
                    <span className={styles.age}>{animal.age} года</span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.tags}>
                    {animal.tags.map(tag => (
                        <span key={tag} className={styles.tag}>
              {tag}
            </span>
                    ))}
                </div>

                <p className={styles.description}>
                    Очень хороший питомец, любит играть и гулять
                </p>
            </div>
        </div>
    )
}