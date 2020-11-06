import React, { useState, useEffect } from 'react';
import { IAPI_CATEGORY } from '../../../interfaces/api.types';
import { getCategories } from '../../../services/contentService';
import {
  useContentState,
  useContentDispatch,
  setCategory,
} from '../../../context/ContentContext';

// styles
import styles from './index.module.scss';

type Props = { setOpen: Function };

const Sidebar = ({ setOpen }: Props) => {
  const dispatch = useContentDispatch();
  const { categoryId } = useContentState();

  const [categories, setCategories] = useState<IAPI_CATEGORY[]>([]);

  const fetch = async () => {
    const { data } = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const chooseCategory = (catId: number) => {
    setCategory(dispatch, `${catId}`);
    setOpen(false);
  };

  return (
    <div className={styles.sidebar}>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            className={
              category.id === parseInt(categoryId) ? styles.active : ''
            }
            onClick={() => chooseCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
