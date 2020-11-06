import { AxiosResponse } from 'axios';
import axios from './axios';

import { IAPI_CATEGORY, IAPI_IMAGE } from '../interfaces/api.types';

export async function getCategories(): Promise<AxiosResponse<IAPI_CATEGORY[]>> {
  return await axios.get('categories/');
}

export async function getImages(
  categoryId: string | number,
  limit: number = 10,
  page: number = 0
): Promise<AxiosResponse<IAPI_IMAGE[]>> {
  return await axios.get(
    `images/search?page=${page}&limit=${limit}&category_ids=${
      categoryId ? categoryId : ''
    }`
  );
}

const services = {
  getCategories,
  getImages,
};
export default services;
