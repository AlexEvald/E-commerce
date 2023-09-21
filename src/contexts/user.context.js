import {createContext, useEffect, useReducer} from "react";
import {createUserDocumentFromAuth, onAuthStateChangeListener, signOutUser} from "../utils/firebase/firebase.utils";
import {createAction} from "../utils/reducer/reducer.utils";


//as the actual value you want to acess
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});







export const USER_ACTION_TYPE = {
    SET_CURRENT_USER :  'SET_CURRENT_USER'
}

const userReducer = (state, action) =>{
    // console.log("THE TYPE ", action);

    const {type,payload} = action;
    switch(type){
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:payload
            };
        default:
            throw new Error(`Unhandled case for type : ${type}` );
    }

}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {

    const [{currentUser},dispatch] = useReducer(userReducer,INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user))
    }

    const value = {currentUser,setCurrentUser};


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


//this is with React Context
// //as the actual value you want to acess
// export const UserContext = createContext({
//     currentUser: null,
//     setCurrentUser: () => null
// });
//
// //this is the actual commponent
// export const UserProvider = ({children}) => {
//
//     const [currentUser, setCurrentUser] = useState(null);
//     const value = {currentUser,setCurrentUser};
//
//     //we need this because the auth keep track of user when you refresh
//     //this way every time thi scomponent mout then the user signout
//     // signOutUser();
//
//     useEffect(() => {
//         const unsubscribe = onAuthStateChangeListener((user) =>{
//             if(user){
//                 createUserDocumentFromAuth(user);
//             }
//             setCurrentUser(user);
//         });
//         //the returned function is called cleanup. cleanup is run before the effect is reached (to clean up effects from previous renders)
//         return unsubscribe;
//     }, []);
//     return <UserContext.Provider value ={value}> {children}</UserContext.Provider>
// }

