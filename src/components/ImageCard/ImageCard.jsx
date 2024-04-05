import css from './ImageCard.module.css'

export default function ImageCard({ data: { alt_description, urls: { small, full } }, onClick }) {
    return (
        <div className={css.cardWrapper} onClick={() => onClick(full, alt_description)}>
            <img className={css.image} src={small} alt={alt_description} />
        </div>
    )
}