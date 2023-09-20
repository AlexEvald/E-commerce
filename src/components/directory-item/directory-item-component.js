
import './directory-item.styles.scss'
const DirectoryItem = ({...props}) => {

    const {id,imageUrl,title} =props.category;


    return (
        <div className={'directory-item-container'} key={id}>
            <div className={'background-image'} style={{
                backgroundImage: `url(${imageUrl})`
            }}/>
            <div className={'body'}>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )

}

export default DirectoryItem