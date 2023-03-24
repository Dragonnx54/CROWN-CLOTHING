import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase.utils";


const SignIn = () => {
    const logGoogleJUser = async () =>{
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
            <button onClick={logGoogleJUser}>
                Sign in with google popup
            </button>
        </div>
    )
}

export default SignIn;