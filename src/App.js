import './categories.styles.scss'
import Home from "./routes/home/home.component";
import {Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";


function App() {

    const Shop = () => {
        return (
            <div>
                Iam the shop page
            </div>
        )
    }


  return (
      <Routes>
          <Route path={'/'} element={<Navigation/>}>
            <Route index={true}  element={<Home/>}/>  {/* when the index is true when ever the parent path match then display this component also*/}
            <Route path='/shop'  element={<Shop/>}/>
            <Route path='/sign-in'  element={<SignIn/>}/>
          </Route>
      </Routes>

  );
}

export default App;
