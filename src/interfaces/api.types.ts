export interface IAPI_CATEGORY {
  id: number;
  name: string;
}

export interface IAPI_IMAGE {
  breeds: Array<any>;
  categories: IAPI_CATEGORY[];
  id: string;
  url: string;
  width: number;
  height: number;
}
