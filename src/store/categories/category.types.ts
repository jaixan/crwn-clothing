export enum CATEGORIES_ACTIONS_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

export type productType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type categoryType = {
  title: string;
  items: productType[];
};

export type categoriesMapType = {
  [key: string]: productType[];
};

export type CategoriesState = {
  readonly categories: categoryType[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};
