import CategoryItem from "../category-item/category-item-component";
import './directrory.styles.sccs'
const Directory = ({categories}) => {

    return (
        <div className={'categories-container'}>
        {categories.map( (category) =>{
            return <CategoryItem category = {category}/>
        })}
    </div>
    )
}

export default Directory;