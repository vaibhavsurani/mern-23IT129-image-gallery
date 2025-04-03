function TagFilter({ tags, selectedTag, onTagSelect }) {
  return (
    <div className="tag-filter">
      <h2>Filter by Tags</h2>
      <div className="tag-buttons">
        <button
          className={`tag-button ${!selectedTag ? 'active' : ''}`}
          onClick={() => onTagSelect('')}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagFilter; 