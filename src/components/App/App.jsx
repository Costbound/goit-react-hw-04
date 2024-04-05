import css from './App.module.css'
import { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import ImageGallery from '../ImageGallery/ImageGallery'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import ImageModal from '../ImageModal/ImageModal'
import { fetchImages } from '../../images-api'



export default function App() {
    const [fetchedData, setFetchedData] = useState([])
    const [searchWord, setSearchWord] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalUrl, setModalUrl] = useState('')
    const [modalAlt, setModalAlt] = useState('')

    const handleSubmit = (searchValue) => {
        setSearchWord(searchValue)
    }

    useEffect(() => {
        if (searchWord) { 
            const fetchData = async () => {
                try {
                    setFetchedData([])
                    setPage(1)
                    setError('')
                    setLoading(true)
                    const data = await fetchImages(searchWord, 1)
                    if (data.length > 0) {
                        setFetchedData(data)
                    } else {
                        throw new Error('We found nothing by your request... =(')
                    }
                    
                } catch (err) {
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }
            fetchData()
        }
    }, [searchWord])

    const handleLoadMore = () => {
        const fetchData = async () => {
            try {
                setError('')
                setLoading(true)
                const data = await fetchImages(searchWord, page + 1)
                if (data.length > 0) {
                    setFetchedData(fetchedData.concat(data))
                    setPage(page + 1)
                } else {
                    toast.error("There are no more images...")
                }
            } catch (err) {
                setFetchedData([])
                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchData()
    }

    const handleCardClick = (imgUrl, imgAlt) => {
        setModalUrl(imgUrl)
        setModalAlt(imgAlt)
        setIsModalOpen(true)
    }
    console.log(modalAlt, modalUrl)
    return (
        <div className="content-container">
            <SearchBar onSubmit={handleSubmit} />
            <ImageGallery data={fetchedData} onClick={handleCardClick} />
            <Loader isVisible={loading} />
            {(fetchedData.length > 0 && !loading) && <LoadMoreBtn onClick={handleLoadMore}/>}
            <ImageModal isOpen={isModalOpen} url={modalUrl} alt={modalAlt} />
            {error && <ErrorMessage message={error} />}
        </div>
    )
}