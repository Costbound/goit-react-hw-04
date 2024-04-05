import css from './ImageGallery.module.css'
import ImageCard from '../ImageCard/ImageCard'

export default function ImageGallery({ data, onClick }) {

    return (
        <ul className={css.list}>
            {data && data.map(card =>
                <li key={card.id}>
                    <ImageCard data={card} onClick={(imgUrl, imgAlt) => onClick(imgUrl, imgAlt)} />
                </li>
            )}
        </ul>
    )
}