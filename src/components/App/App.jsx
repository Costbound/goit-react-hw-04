import './App.module.css'
import SearchBar from '../SearchBar/SearchBar'

export default function App() {

    const handleSubmit = (searchValue) => {

    }

    return (
        <div className="content-container">
            <SearchBar onSubmit={handleSubmit}/>
        </div>
    )
}