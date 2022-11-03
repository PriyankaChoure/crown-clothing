import { useState } from "react";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.style.scss'
import {createUserDocumentFromAuth, signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button from "../button/button.component";

const defaultFormField = {
    email : "",
    password : "",
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const {email, password } = formField;
    // console.log(formField);

    //const { setCurrentUser } = useContext(UserContext);

    const resetFormField = () => {
        setFormField(defaultFormField);
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormField({...formField, [name]: value });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            // setCurrentUser(user);
            resetFormField();
        }catch(err){
            switch (err.code) {
                case 'auth/wrong-password' :
                    alert("Worng password");
                    break;
                
                case 'auth/user-not-found': 
                    alert("email not found");
                    break;
                default :
                    console.log(err);
            }
            
        }
    }
    const signInWithGoogle = async()=> {
         await signInWithGooglePopup();

    }
    return (
        <div className='sign-up-container' >
            <h2>Already have an account</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email'
                    type='email' 
                    required 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                />

                <FormInput 
                    label='Password'
                    type='password' 
                    required 
                    name="password" 
                    value={password} 
                    onChange={handleChange} 
                />
                <div className="buttons-container" >
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google'  onClick={signInWithGoogle} >Google Sign In </Button> 

                </div>
            </form>
        </div>
    )

}

export default SignInForm;