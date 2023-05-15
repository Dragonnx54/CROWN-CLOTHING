import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{
    //returns two value [value, setValueFunction] = useState(DEFAULT VALUE)
    const[formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if( password !== confirmPassword){
            alert('passwords do not match')
            return;
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            const userDocRef = await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        }catch(error){
            if( error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            }else{
                console.log('something went wrong', error)
            }
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={(event) => handleSubmit(event)}>
                <FormInput label='Display Name' type='text' name='displayName' required onChange={handleChange} value= {displayName} />
                <FormInput label='Email' type='email' name='email' required onChange={handleChange} value={email}/>
                <FormInput label='Password' type='password' name='password' required onChange={handleChange} value={password} />
                <FormInput label='Confirm Password' type='password' name='confirmPassword' required onChange={handleChange} value={confirmPassword} />
                <Button type={'submit'}>
                    Sign up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm;