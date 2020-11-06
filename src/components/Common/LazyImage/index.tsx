import React from 'react';
import styled from 'styled-components';
import { IAPI_IMAGE } from '../../../interfaces/api.types';

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const Image = styled.img`
  display: block;
  object-fit: cover;
  height: 230px;
  width: 230px;
  border-radius: 3px;
  // Add a smooth animation on loading
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  // I use utilitary classes instead of props to avoid style regenerating
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
  }
  &.has-error {
    // fallback to placeholder image on error
    content: url(${placeHolder});
  }
`;

const LazyImage: React.FC<IAPI_IMAGE> = ({ url, id: alt }) => {
  const onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //@ts-ignore
    event.target.classList.add('loaded');
  };

  const onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    //@ts-ignore
    event.target.classList.add('has-error');
  };

  return <Image src={url} alt={alt} onLoad={onLoad} onError={onError} />;
};

export default LazyImage;
