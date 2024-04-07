import { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import ImageGallery from '../ImageGallery/ImageGallery'
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import ImageModal from '../ImageModal/ImageModal'
import { fetchImages } from '../../images-api'



export default function App() {
    // Array of images data for build gallery
    const [fetchedData, setFetchedData] = useState([])
    // Value which enter user in search form
    const [searchWord, setSearchWord] = useState('')
    // Page No for fetch with load more
    const [page, setPage] = useState(1)
    // Status of loader - visivle or not
    const [loading, setLoading] = useState(false)
    // Error message in case of error and '' in case no error. Using also like a bool for render or no err component
    const [error, setError] = useState('')
    // Opened/Closed modal bool for react-modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Fullsize image url and alt text for modal image
    const [modalUrl, setModalUrl] = useState('')
    const [modalAlt, setModalAlt] = useState('')

    const handleSubmit = (searchValue) => {
        setSearchWord(searchValue)
        setFetchedData([])
        setPage(1)
    }

    useEffect(() => {
        // if to avoid fetch with empty searchWord during first render
        if (searchWord) { 
            const fetchData = async () => {
                try {
                    // Clean error if previous request was error
                    setError('')
                    setLoading(true)
                    const data = await fetchImages(searchWord, page)
                    // Check if thre is any image in data array and throw error if data []
                    if (data.length > 0) {
                        setFetchedData([...fetchedData, ...data])
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
    }, [searchWord, page])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    // set states for opened modal
    const handleCardClick = (imgUrl, imgAlt) => {
        setModalUrl(imgUrl)
        setModalAlt(imgAlt)
        setIsModalOpen(true)
    }

    // set state for closed modal
    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="content-container">
            <SearchBar onSubmit={handleSubmit} />
            <ImageGallery data={fetchedData} onClick={handleCardClick} />
            <Loader isVisible={loading} />
            {error && <ErrorMessage message={error} />}
            {/* LoadMoreBtn appear if there are already some images in gallery and there is no loading */}
            {/* LoadMoreBtn text will be "Load more" in normal condition and "Try agail" in case of fetch error*/}
            {(fetchedData.length > 0 && !loading) && <LoadMoreBtn onClick={handleLoadMore}>
                {error ? 'Try again' : 'Load more'}
            </LoadMoreBtn>}
            <ImageModal onClose={handleModalClose} isOpen={isModalOpen} url={modalUrl} alt={modalAlt} />
        </div>
    )
}