import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener, signOutUser} from "../utils/firebase/firebase.utils";


//as the actual value you want to acess
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

//this is the actual commponent
export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};

    //we need this because the auth keep track of user when you refresh
    //this way every time thi scomponent mout then the user signout
    // signOutUser();

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListener((user) =>{
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        //the returned function is called cleanup. cleanup is run before the effect is reached (to clean up effects from previous renders)
        return unsubscribe;
    }, []);
    return <UserContext.Provider value ={value}> {children}</UserContext.Provider>
}

