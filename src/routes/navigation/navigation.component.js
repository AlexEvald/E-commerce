import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import {ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.styles.scss';
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContext} from "../../contexts/cart.context";
const Navigation = () => {

    const {currentUser} = useContext(UserContext);
    const {isCartOpen,setIsCartOpen} = useContext(CartContext);

    const closeCartPopup = () =>{
        setIsCartOpen(false);
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