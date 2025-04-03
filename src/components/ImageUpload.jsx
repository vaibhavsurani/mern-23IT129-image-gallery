import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

function ImageUpload({ onUpload }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !title) return;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('tags', tags);

    onUpload(formData);

    // Reset form
    setTitle('');
    setTags('');
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="image-upload">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., nature, landscape, sunset"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="file-input-label">
            <FiUpload className="upload-icon" />
            Choose Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="file-input"
          />
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={!image || !title}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default ImageUpload; 