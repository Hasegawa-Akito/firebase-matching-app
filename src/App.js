import SignIn from './component/SignIn';
import Matching from './component/Matching';
import {createContext, useState} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


export const UserNameContext = createContext();

function App() {
  // useContextとuseStateを連携し値を別コンポーネントで変更可能
  const [userInfo, setUserInfo] = useState({userName: "", userConfirm: "", uid: "", status: ""});
  const contextValue = {userInfo, setUserInfo};

  return (
    <div className="App">
      {/* useContextにより別コンポーネントへ値を渡す */}
      <UserNameContext.Provider value={contextValue}>
        <BrowserRouter>
          <Routes>
            
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/matching" element={<Matching />} /> 
              <Route path="/*" element={<ToSignIn />} /> 
            
          </Routes>
        </BrowserRouter>
      </UserNameContext.Provider>
    </div>
  );
}

//想定外のURLはリダイレクトさせる
function ToSignIn() {
  
  return <Navigate to='/SignIn'/>;

}


export default App;
