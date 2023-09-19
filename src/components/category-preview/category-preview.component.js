import './category-preview.styles.scss';
import ProductCard from "../product-card/product-card.component";


const CategoryPreview = ({title , products}) => {


    //in the filter the _ indicates that i will not need it , and the other idx is the index
    //where we say that we will filter out what ever have index greater or equal to 4
    return (
        <div className={'category-preview-container'}>
            <h2>
                <span className={'title'}>{title}</span>
            </h2>

            <div className={'preview'}>
                {
                    products && products
                        .filter((_,idx) => idx <4)
                        .map( (product) => (
                            <ProductCard key={product.id} product={product}/>))
                }
            </div>
        </div>
    )
}

export default CategoryPreview;