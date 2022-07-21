import './App.css';
import SignIn from './component/SignIn';
import Matching from './component/Matching';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/matching" element={<Matching />} /> 
          <Route path="/*" element={<ToSignIn />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//想定外のURLはリダイレクトさせる
function ToSignIn() {
  
  return <Navigate to='/SignIn'/>;

}


export default App;
