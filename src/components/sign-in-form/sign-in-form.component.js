import {useContext, useState} from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    email: '',
    password :'',
}

const SignInForm = () =>{

    const [formFields,setFormFields]= useState(defaultFormFields);
    const {email, password} = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        resetFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {

        /* we don't want any default behaviour of the form */
        event.preventDefault();

        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);

            setCurrentUser(user);
            resetFormFields();

        }catch(error){

            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect paswwrod for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }


        }


    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        /* you spread the state, and then you find the specific field and replace it with value */
        setFormFields({...formFields, [name] : value});
    }

    return (
        <div className={'sign-in-container'}>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>


            <form onSubmit={handleSubmit}>
                <FormInput label={'Email'} type={'email'} required={true} name={'email'} value={email} onChange={handleChange} />
                <FormInput label={'Password'} type={"password"} required={true} name={'password'} value={password} onChange={handleChange} />

                <div className={'buttons-container'}>
                    {/*when the button is clicked that meean that the callback from onSubmit form will be called*/}
                    <Button type={"submit"}>sign In</Button>
                    <Button  buttonType = {'google'} type={"button"} onClick = {signInWithGoogle} >Google sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;