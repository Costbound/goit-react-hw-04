import css from './Loader.module.css'
import { Triangle } from 'react-loader-spinner'


export default function Loader({isVisible}) {
    return (
        <>
            {isVisible && <Triangle color='#4242aa' wrapperClass={css.loader} />}
        </>
    )
}