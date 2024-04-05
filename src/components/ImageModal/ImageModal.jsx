import css from './ImageModal'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root')

export default function ImageModal({url, alt, isOpen}) {
    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel='fullsize picture modal'
            shouldCloseOnEsc={false}
            shouldCloseOnOverlayClick={true}
        >
            <img src={url} alt={alt} />
        </ReactModal>
    )
}