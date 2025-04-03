import { FiTrash2 } from 'react-icons/fi';

function ImageGallery({ images, onDelete }) {
  return (
    <div className="image-gallery">
      {images.length === 0 ? (
        <p className="no-images">No images found. Upload some images to get started!</p>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image._id} className="gallery-item">
              <img src={image.imageUrl} alt={image.title} />
              <div className="image-info">
                <h3>{image.title}</h3>
                <div className="tags">
                  {image.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(image._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery; 