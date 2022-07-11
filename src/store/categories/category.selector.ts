import { createSelector } from "reselect";
import { RootState } from "../store";
import {
  categoriesMapType,
  CategoriesState,
} from "./category.types";

const selectCategoriesReducer = (state: RootState) : CategoriesState => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesSlice) =>
  categoriesSlice.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as categoriesMapType)
);

export const selectCategoriesIsLoading = (state: RootState) => state.categories.isLoading;