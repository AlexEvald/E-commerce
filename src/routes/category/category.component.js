import './category.style.scss'
import {useParams} from "react-router-dom";
import {Fragment, useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categoriesContext";
import ProductCard from "../../components/product-card/product-card.component";
import {useSelector} from "react-redux";
import {SelectCategoriesMap} from "../../store/categories/category.selector";

const Category = () => {

    //i am getting the url param
    const {category} = useParams();
    const categoriesMap = useSelector(SelectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category,categoriesMap]);


    //products && , we add that because in the first time we are fetching data and the code is trying to run synchronously, and we are fetching async
    return(
        <Fragment>
            <h2 className={'category-title'}>{category.toUpperCase()}</h2>
            <div className={'category-container'}>
                {
                    products && products.map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </div>
        </Fragment>

    )

}

export default Category;