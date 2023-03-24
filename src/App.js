import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import SignIn from './routes/sign-in/sign-in.component';

import Navigation from './routes/navigation/navigation.component';

const App = () => {

  
  return (
    <Routes>
      <Route path='/' Component={Navigation}>
        {/* Index = path='/' */}
        <Route index Component={Home} />
        <Route path='shop' element={<div>:v</div>}></Route>
        <Route path='signin' element={<SignIn />}></Route>
      </Route>
    </Routes>
  );
}

export default App;