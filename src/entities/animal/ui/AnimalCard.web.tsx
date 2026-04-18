import type { Animal } from '../model/types'

interface Props {
    animal: Animal
}

export const AnimalCard = ({ animal }: Props) => {
    return (
        <div className="animal-card">
            <img
                src={animal.image}
                alt={animal.name}
                className="animal-card__image"
                draggable={false}
            />

            <div className="animal-card__content">
                <div className="animal-card__name">{animal.name}</div>
                <div className="animal-card__meta">Age: {animal.age}</div>

                <div className="animal-card__tags">
                    {animal.tags.map(tag => (
                        <span key={tag} className="animal-card__tag">
              {tag}
            </span>
                    ))}
                </div>
            </div>
        </div>
    )
}