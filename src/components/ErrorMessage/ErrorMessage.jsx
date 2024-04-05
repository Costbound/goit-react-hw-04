import css from './ErrorMessage.module.css'

export default function ErrorMessage({ message }) {
    return (
        <div className={css.container}>
            <h2 className={css.errTitle}>{ message }</h2>
        </div>
    )
}