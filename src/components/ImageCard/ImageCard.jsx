import css from './ImageCard.module.css'

export default function ImageCard({ data: { alt_description: alt, urls: { small, full } }, onClick }) {
    return (
        <div className={css.cardWrapper} >
            <img className={css.image} src={small} alt={alt} onClick={() => onClick(full, alt)} />
        </div>
    )
}