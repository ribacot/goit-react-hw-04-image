import React, { useEffect,useState } from 'react';
import pixabayAPI from 'components/Sevice_Api/Pixabay_API';
import { Circles } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMore from 'components/LoadMore/LoadMore';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';


export default function ImageGallery({ searchQwery }) {
  const [pictures, setPictures] = useState([]);
  const [largeImage, setLargeImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isloadMore, setIsloadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const per_page = 12;

  useEffect(() => {
    if (!searchQwery) return;
    setVisible(true);
    pixabayAPI({
      q: searchQwery,
      page,
    })
      .then(resp => {
        (resp.hits.length === per_page) & (resp.totalHits > per_page)
          ? setIsloadMore(true)
          : setIsloadMore(false);
        setPictures(prev => [...prev, ...resp.hits]);
      })
      .catch(error => console.log(error))
      .finally(setVisible(false));
  }, [searchQwery, page, per_page]);

  useEffect(() => {
    setPictures([]);
    setPage(1);
  }, [searchQwery]);

  const toggleModal = e => {
    if (e.target === e.currentTarget) setModalIsOpen(prev => !prev);
  };

  const hendleImage = async e => {
    const { id } = e.target;

    try {
      const resp = await pixabayAPI({ id });
      const largeImage = resp.hits[0].largeImageURL;
      setLargeImage(largeImage);
      setModalIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      <Circles visible={visible} />
      <ul className={css.ImageGallery}>
        {pictures.map(({ id, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            onClick={hendleImage}
          />
        ))}
      </ul>
      {isloadMore && <LoadMore onClick={loadMore} />}
      {modalIsOpen && (
        <Modal onClick={toggleModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </>
  );
}
