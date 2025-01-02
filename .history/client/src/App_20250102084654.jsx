import { Route, Routes } from 'react-router-dom';
import FormPage from './pages/FormPage';

const App = () =>{
    return (
        < >
         <Routes >
            <Route path="/formPage" element={<FormPage />} />
         </Routes>
        </>
      )
    
}
export default App;