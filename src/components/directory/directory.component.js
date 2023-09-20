import DirectoryItem from "../directory-item/directory-item-component";
import './directrory.styles.sccs'
const Directory = ({categories}) => {

    return (
        <div className={'categories-container'}>
        {categories.map( (category) =>{
            return <DirectoryItem category = {category}/>
        })}
    </div>
    )
}

export default Directory;