import { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { signInWithPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import styles from './sign-in-form.module.scss';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';
const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () =>{
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const signInWithGoogle = () => dispatch( googleSignInStart() );

    const logWithPassword = async () =>{ 
        dispatch( emailSignInStart(email, password) );
        /*try{
            let { user } = await signInWithPassword(email, password);
            let token = user.accessToken;
        }catch(error){
            console.log(error);
            if( error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                alert('Invalid email or password');
            }else{
                console.log('something went wrong', error)
            }
        }*/
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if( !validateForm() ){
            alert('Please fill all the fields');
            return;
        }
        logWithPassword();
    }

    const validateForm = () => {
        if( !email || !password ){
            return false;
        }
        return true;
    }

    return(
        <div className={`${styles.container}`}>
            <h2>I already have  an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(event) => handleSubmit(event)}>
                <FormInput label='Email' type='email' name='email' required onChange={handleChange} value={email}/>
                <FormInput label='Password' type='password' name='password' required onChange={handleChange} value={password} />
                <div className={`${styles.buttonsContainer}`}>
                    <Button type={'submit'}>
                        Sign in
                    </Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle}>
                        Google Sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;