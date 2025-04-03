import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import ImageGallery from './components/ImageGallery';
import TagFilter from './components/TagFilter';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [selectedTag]);

  const fetchImages = async () => {
    try {
      const url = selectedTag 
        ? `/api/images?tag=${selectedTag}`
        : '/api/images';
      const response = await axios.get(url);
      setImages(response.data);
      
      // Extract unique tags
      const allTags = response.data.reduce((acc, image) => {
        return [...acc, ...image.tags];
      }, []);
      setTags([...new Set(allTags)]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageUpload = async (formData) => {
    try {
      await axios.post('/api/images', formData);
      fetchImages();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/images/${id}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Image Gallery</h1>
      </header>
      <main>
        <ImageUpload onUpload={handleImageUpload} />
        <TagFilter 
          tags={tags} 
          selectedTag={selectedTag} 
          onTagSelect={setSelectedTag} 
        />
        <ImageGallery 
          images={images} 
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App; 