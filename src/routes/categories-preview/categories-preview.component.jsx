import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

import { useContext } from 'react';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    console.log(categoriesMap);

    return (
      <>
        {Object.keys(categoriesMap).map((title) => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
        ))}
      </>
    );
}

export default CategoriesPreview;