import './category.style.scss'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CategoriesContext} from "../../contexts/categoriesContext";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {

    //i am geting the url param
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category,categoriesMap]);


    //products && , we add that because in the first time we are fetching data and the code is trying to run synchronously, and we are fetching async
    return(

        <div className={'category-container'}>
            {
                products && products.map((product) => <ProductCard key={product.id} product={product}/>)
            }
        </div>
    )

}

export default Category;