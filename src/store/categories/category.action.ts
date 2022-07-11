import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";

import { CATEGORIES_ACTIONS_TYPES, categoryType } from "./category.types";

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS,
  categoryType[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: categoryType[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED, error)
);
