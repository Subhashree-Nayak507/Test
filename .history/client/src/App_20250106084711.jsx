import { Route, Routes } from 'react-router-dom';
import FormPage from './pages/FormPage';
import SignUpPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

const App = () =>{
    return (
        < >
         <Routes >
           <Route path="/" element={<SignUpPage />} />
           <Route path="/login" element={<LoginPage />} />
            <Route path="/formPage" element={<FormPage />} />
         </Routes>
        </>
       
      )
    
}
export default App;