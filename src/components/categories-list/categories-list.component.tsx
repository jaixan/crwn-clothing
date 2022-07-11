import DirectoryItem from '../directory-item/directory-item.component';
import {CategoriesContainer} from './categories-list.styles';
import { categoryType } from '../../store/categories/category.types';

export type categoryListItem = {
  id: number;
  title: string;
  imageUrl: string;
}

const categories: categoryListItem[] = [
  {
    id: 1,
    title: "hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
  },
  {
    id: 2,
    title: "jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
  },
  {
    id: 3,
    title: "sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
  },
  {
    id: 4,
    title: "womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
  },
  {
    id: 5,
    title: "mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
  }
];

const CategoriesList = () => {
    return (
        <CategoriesContainer>
          {categories.map((category) => {
            return ( <DirectoryItem key= {category.id} category= {category} /> )
          })}
        </CategoriesContainer>
    )
}

export default CategoriesList;