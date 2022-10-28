import './categories.styles.scss';
import { Routes, Route}  from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sing-in.component';

const Shop = () =>{
  return (
      <div>
          <div>
              <h1>Hi i am Shop component</h1>
          </div>
          
      </div>
  )
}

const  App = () => {
 
  return (
   <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route  index element={<Home/>} />
        <Route  path="/shop" element={<Shop/>} />
        <Route  path="/sign-in" element={<SignIn/>} />
      </Route>
   </Routes>
  );
}

export default App;