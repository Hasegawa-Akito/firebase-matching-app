import { signInWithPopup } from 'firebase/auth';
import './App.css';
import { auth, provider } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

function App() {
  const [user] = useAuthState(auth)
  const [result, changeResult] = useState((<h3>ログイン前</h3>));
  
  useEffect(() => {
    
    if (user != null) {
      changeResult((<h3>ログイン後</h3>));
    }

  },[user]);
  
  return (
    <div className="App">
      {result}
      <SignInButton />
    </div>
  );
}

function SignInButton() {

  const signInGoogle = () => {
    signInWithPopup(auth, provider);
  }

  return (
    <button type="button" className="btn btn-primary" onClick={signInGoogle}>googleでログイン</button>
  );
}



export default App;
