import {useContext, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    displayName : '',
    email: '',
    password :'',
    confirmPassword :''
}

const SignUpForm = () =>{

    const [formFields,setFormFields]= useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const {setCurrentUser} = useContext(UserContext)
    const resetFormFields = () => {
        resetFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {

        /* we don't want any default behaviour of the form */
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password do not match");
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);

            setCurrentUser(user);

            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();


        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }
            console.error('user created encountered an error',error);

        }


    }


    const handleChange = (event) => {
        const {name, value} = event.target;
        /* you spread the state, and then you find the specific field and replace it with value */
        setFormFields({...formFields, [name] : value});
    }

    return (
        <div className={'sign-up-container'}>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label={'Display Name'} type={'text'} required={true} name={'displayName'} value={displayName} onChange={handleChange} />
                <FormInput label={'Email'} type={'email'} required={true} name={'email'} value={email} onChange={handleChange} />
                <FormInput label={'Password'} type={"password"} required={true} name={'password'} value={password} onChange={handleChange} />
                <FormInput label={'Confirm Password'} type={"password"} required={true} name={'confirmPassword'} value={confirmPassword} onChange={handleChange} />


                {/*when the button is clicked that meean that the callback from onSubmit form will be called*/}
                <Button type={"submit"}>sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;