import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import {
  CategoryPreviewContainer,
  CategoryPreviewGrid,
  CategoryPreviewTitle,
} from "./category-preview.styles";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Link to={`/shop/${title}`}>
          <CategoryPreviewTitle>{title.toUpperCase()}</CategoryPreviewTitle>
        </Link>
      </h2>
      <CategoryPreviewGrid>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryPreviewGrid>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;