
import './directory-item.styles.scss';
import {useNavigate} from "react-router-dom";
const DirectoryItem = ({...props}) => {

    const {id,imageUrl,title,route} =props.category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);


    return (
        <div className={'directory-item-container'} key={id} onClick={onNavigateHandler}>
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