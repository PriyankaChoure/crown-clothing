import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";

import './sign-up-form.style.scss'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from "../../components/button/button.component";

const defaultFormField = {
    displayName : "",
    email : "",
    password : "",
    confirmPassword : ""
}

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword } = formField;
    // console.log(formField);

    const resetFormField = () => {
        setFormField(defaultFormField);
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormField({...formField, [name]: value });
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(password !== confirmPassword ) {
            alert("password not match");
        }
        try{
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {displayName})
            resetFormField();

        }catch(err){
            if(err.code === 'auth/email-already-in-use'){
                alert('email already exist');
            }
            console.log(err.message)
        }
    }
    return (
        <div className='sign-up-container' >
            <h2>Don't have an account</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Display Name'
                    type='text'    
                    required 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} 
                />

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

                <FormInput 
                    label='Confirm Password'
                    type='password' 
                    required 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )

}

export default SignUpForm;