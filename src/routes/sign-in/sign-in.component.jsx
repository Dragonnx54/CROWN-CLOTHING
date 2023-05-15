import { auth,signInWithGooglePopup, createUserDocumentFromAuth, /*signInWithGoogleRedirect*/ } from "../../utils/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    /*useEffect(() => {
        const getRedirectResultGoogle = async ()=>{
            try{
                const response = await getRedirectResult(auth);
                if( response ){
                    const userDocRef = await createUserDocumentFromAuth(response.user);
                    console.log(userDocRef);
                }
                console.log(response);
            }catch(error){
                console.log('some errors');
            }
        }
        getRedirectResultGoogle();
    },[])*/

    const logGoogleUser = async () =>{
        try{
            const {user} = await signInWithGooglePopup();
            const userDocRef = await createUserDocumentFromAuth(user);
        }catch(error){
            console.log('an error occured')
        }
    }

    return(
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with google popup
            </button>
            {/*<button onClick={signInWithGoogleRedirect}>
                Sign in with google redirect
            </button>*/}
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default SignIn;