import { User } from 'firebase/auth';
import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInWithPassword, signOutUser, createAuthUserWithEmailAndPassword, UserAditionalInformation, UserData } from '../../utils/firebase/firebase.utils';
import { EmailSignInStart, signInFailed, SignInSuccess, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, SignUpStart, SignUpSuccess, signUpSuccess } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth: User, aditionalDetails?: UserAditionalInformation){
    try{
        const userSnapshot = yield* call( createUserDocumentFromAuth, userAuth, aditionalDetails);
        if( userSnapshot ){
            yield* put( signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}) );
        }
    }catch(error){
        yield* put( signInFailed(error as Error) );
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield* call( getCurrentUser );
        if( !userAuth ) return;
        yield* call( getSnapshotFromUserAuth, userAuth);
    }catch(error){
        yield* put( signInFailed(error as Error) );
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield* call(signInWithGooglePopup);
        yield* call( getSnapshotFromUserAuth, user);
    }catch( error ){
        yield* put( signInFailed(error as Error) );
    }
}

export function* signInWithEmail({ payload : { email, password} }: EmailSignInStart){
    try{
        const userCredential = yield* call( signInWithPassword, email, password);
        if( userCredential ){
            const { user } = userCredential;
            yield* call( getSnapshotFromUserAuth, user );
        }
    }catch(error){
        yield* put( signInFailed(error as Error) );
    }
}

export function* signOut(){
    try{
        yield* call( signOutUser );
        yield* put( signOutSuccess() );
    }catch(error){
        yield* put( signOutFailed(error as Error) );
    }
}

export function* signUp({payload: {email, password, displayName}}: SignUpStart){
    try{
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if( userCredential ){
            let { user } = userCredential;
            yield* put( signUpSuccess(user, {displayName}) );
        }
    }catch(error){
        yield* put( signUpFailed(error as Error) );
    }
}

export function* signUpAfterSignUp({ payload: { user, aditionalDetails} }: SignUpSuccess){
    yield* call( getSnapshotFromUserAuth, user, aditionalDetails);
}

export function* onCheckUserSession(){
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignIn(){
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignIn(){
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail )
}

export function* onSignOut(){
    yield* takeLatest(USER_ACTION_TYPES.SIGNOUT_START, signOut )
}

export function* onSignUp(){
    yield* takeLatest(USER_ACTION_TYPES.SIGNUP_START, signUp )
}

export function* onSignUpSuccess(){
    yield* takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signUpAfterSignUp);
}

export function* userSagas(){
    yield* all([
        call( onCheckUserSession ), 
        call( onGoogleSignIn), 
        call( onEmailSignIn), 
        call(onSignOut), 
        call( onSignUp), 
        call(onSignUpSuccess) 
    ]);
}