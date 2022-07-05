import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

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
    }, {})
);

export const selectCategoriesIsLoading = (state) => state.categories.isLoading;
// export const selectCategoriesIsLoading = createSelector(
//   [selectCategories],
//   (categoriesSlice) => categoriesSlice.isLoading
// );