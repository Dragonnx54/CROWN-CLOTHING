import { takeLatest, put, all, call } from 'redux-saga/effects';
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInWithPassword, signOutUser, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed, signUpSuccess } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, aditionalDetails = {}){
    try{
        const userSnapshot = yield call( createUserDocumentFromAuth, userAuth, aditionalDetails);
        yield put( signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}) );
    }catch(error){
        yield put( signInFailed(error) );
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield call( getCurrentUser );
        if( !userAuth ) return;
        yield call( getSnapshotFromUserAuth, userAuth);
    }catch(error){
        yield put( signInFailed(error) );
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield call(signInWithGooglePopup);
        yield call( getSnapshotFromUserAuth, user);
    }catch( error ){
        yield put( signInFailed(error) );
    }
}

export function* signInWithEmail(action = {}){
    const { payload } = action;
    if(!payload) return;
    const { email, password} = payload;
    try{
        const { user } = yield call( signInWithPassword, email, password);
        yield call( getSnapshotFromUserAuth, user );
    }catch(error){
        yield put( signInFailed(error) );
    }
}

export function* signOut(){
    try{
        yield call( signOutUser );
        yield put( signOutSuccess() );
    }catch(error){
        yield put( signOutFailed(error) );
    }
}

export function* signUp({payload: {email, password, displayName}}){
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put( signUpSuccess(user, {displayName}) );
    }catch(error){
        yield put( signUpFailed(error) );
    }
}

export function* signUpAfterSignUp({ payload: { user, aditionalDetails} }){
    yield call( getSnapshotFromUserAuth, user, aditionalDetails);
}

export function* onCheckUserSession(){
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignIn(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}

export function* onEmailSignIn(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail )
}

export function* onSignOut(){
    yield takeLatest(USER_ACTION_TYPES.SIGNOUT_START, signOut )
}

export function* onSignUp(){
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signUp )
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signUpAfterSignUp);
}

export function* userSagas(){
    yield all([
        call( onCheckUserSession ), 
        call( onGoogleSignIn), 
        call( onEmailSignIn), 
        call(onSignOut), 
        call( onSignUp), 
        call(onSignUpSuccess) 
    ]);
}