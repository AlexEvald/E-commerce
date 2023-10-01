import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss';
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {useDispatch, useSelector} from "react-redux";
import {CurrentUser} from "../../store/user/user.selector";
import {selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";
const Navigation = () => {

    const  dispatch = useDispatch();
    const currentUser = useSelector(CurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen)

    const closeCartPopup = () =>{
        dispatch(setIsCartOpen(false));
    }

    return (
        <Fragment>
            <div className={'navigation'}>
                <Link className={'logo-container'} to={'/'} onClick={closeCartPopup}>
                    <CrwnLogo className={'logo'} />
                </Link>
                <div className={'nav-links-container'}>
                    <Link className={'nav-link'} to={'/shop'} onClick={closeCartPopup}> SHOP</Link>
                    {currentUser ? (<span className={'nav-link'} onClick={signOutUser}> SIGN OUT</span>) : (<Link className={'nav-link'} to={'/auth'}> SIGN IN</Link>)}
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/> }
            </div>
            <Outlet/>  {/* Outlet this replaces the located component from the nested Router elements*/}
        </Fragment>
    )
}

export default Navigation;