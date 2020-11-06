/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { IAPI_IMAGE } from '../../../interfaces/api.types';
import { getImages } from '../../../services/contentService';

import LazyImage from '../LazyImage';
import Loading from '../Loading';

import { useContentState } from '../../../context/ContentContext';

const GallleryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 33%;
  padding: 16px;
`;

const CustomButton = styled.button`
  display: inline-block;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  background: #222d32;
  font-size: 21px;
  padding: 0.6em;
  border: 0.1em solid #ffffff;
  margin: 1em 0.3em 1em 0.3em;
  border-radius: 0.3em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s;
  &:hover {
    color: #dddddd;
    border-color: #dddddd;
  }
`;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<IAPI_IMAGE[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [page, setPage] = useState(0);

  const { categoryId } = useContentState();

  const fetch = async (catId: string, page: number) => {
    setLoading(true);
    const { data } = await getImages(catId, 10, page);
    setPage(page + 1);
    if (page === 0) setImages(data);
    else setImages([...images, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    setImages([]);
    fetch(categoryId, 0);
  }, [categoryId]);

  return (
    <>
      <GallleryWrapper>
        {images.map((image, index) => (
          //because the ids were not unique
          <ImageWrapper key={image.id + index}>
            <LazyImage {...image}></LazyImage>
          </ImageWrapper>
        ))}
      </GallleryWrapper>
      <div style={{ width: '100%', textAlign: 'center' }}>
        {loading && <Loading />}
        {!loading && (
          <CustomButton onClick={() => fetch(categoryId, page)}>
            Load More
          </CustomButton>
        )}
      </div>
    </>
  );
};
export default Gallery;
