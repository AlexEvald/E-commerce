import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {SelectCategoriesMap, selectCategoriesMap} from "../../store/categories/category.selector";


const CategoriesPreview = () => {
    const categoriesMap = useSelector(SelectCategoriesMap);
    return (
        <div className={'shop-container'}>

            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products}/>
                    )

                })
            }

        </div>

    )
};

export default CategoriesPreview;

