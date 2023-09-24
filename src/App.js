import './categories.styles.scss'
import Home from "./routes/home/home.component";
import {Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import {useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener} from "./utils/firebase/firebase.utils";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "./store/user/user.action";


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) =>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });
        //the returned function is called cleanup. cleanup is run before the effect is reached (to clean up effects from previous renders)
        return unsubscribe;
    }, [dispatch]);



  return (
      <Routes>
          <Route path={'/'} element={<Navigation/>}>
            <Route index={true}  element={<Home/>}/>  {/* when the index is true when ever the parent path match then display this component also*/}
            <Route path='shop/*'  element={<Shop/>}/>
            <Route path='auth'  element={<Authentication/>}/>
            <Route path='checkout'  element={<Checkout/>}/>
          </Route>
      </Routes>

  );
}

export default App;
