import css from './SearchBar.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast'

export default function SearchBar({ onSubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const value = e.target.search.value
        if (!value.trim().length) {
            return toast.error("This field cannot be empty")
        }
        onSubmit(value)
    }

    return (
        <header className={css.header}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input
                    className={css.searchInput}
                    name='search'
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.submitButton} type="submit">
                    <AiOutlineSearch
                        className={css.searchIcon}
                        size='20'
                    />
                </button>
                <Toaster containerStyle={{ top: 60 }} />
            </form>
        </header>
    )
}