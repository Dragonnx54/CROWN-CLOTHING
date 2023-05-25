import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';

import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import { useEffect } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if( user ){
        await createUserDocumentFromAuth(user);
      }
      dispatch( setCurrentUser(user) );
    });
    return unsubscribe;
  }, []);

  
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        {/* Index = path='/' */}
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />}></Route>
        <Route path='auth' element={<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}/>
      </Route>
    </Routes>
  );
}

export default App;