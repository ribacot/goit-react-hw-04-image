import React, { useState } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';

import Searchbar from './Searchbar/Searchbar';

export function App() {
  const [searchQwery, setSearchQwery] = useState('');
  const [value, setValue] = useState('');

  const hendlSearch = e => {
    const { value } = e.target;
    setSearchQwery(value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const value = e.target.elements.searchQwery.value;
    setValue(value);
    setSearchQwery('');
  };
  return (
    <div className="App">
      <Searchbar
        value={searchQwery}
        onSubmit={onSubmit}
        onChenge={hendlSearch}
      />
      <ImageGallery searchQwery={value} />
    </div>
  );
}
