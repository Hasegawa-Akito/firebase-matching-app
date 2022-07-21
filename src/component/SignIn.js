import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserNameContext} from "../App"
import "../css/SignIn.css";

function SignIn() {
  const [user] = useAuthState(auth)
  const [authResult, changeAuthResult] = useState((<SignInButton />));
  
  useEffect(() => {
    //認証済みならユーザー名登録の画面を表示
    if (user != null) {
        changeAuthResult((<RegisterName />));
    }
  },[user]);
  
  return (
    <div class="container">
        <div class="login-container">
                <div id="output"></div>
                <div class="avatar"></div>
                <div class="form-box">
                    { authResult }
                </div>
            </div>
            
    </div>
    
  
  );
}

function SignInButton() {
  
  // googleのログイン認証popupを表示
  const signInGoogle = () => {
    signInWithPopup(auth, provider);
  }

  return (
    <div>
        <h3 class="text-muted">ログイン認証</h3>
        <button type="button" className="btn btn-primary login" onClick={signInGoogle}>googleでログイン</button>
    </div>
  );
}

function RegisterName() {
    const [user] = useAuthState(auth)
    //inputの値を参照
    const inputUserName = useRef("");
    const [errorCheck, setErrorCheck] = useState(false);
    // useContextにより値を受け取り
    const {userInfo, setUserInfo} = useContext(UserNameContext);
    // ページ遷移
    const navigate = useNavigate()

    // ユーザー名登録処理
    const registerUser = () => {
        const userName = inputUserName.current.value;

        // ユーザー名が空文字の時
        if (!userName) {
            setErrorCheck(true);
        }
        else {
            setUserInfo({userName: userName, userConfirm: user.email, uid: user.uid});
            navigate('/matching')
        }
    }

    return (
        <div>
            {errorCheck ? <p class="text-danger">入力してください。</p> : <div class="hoge"></div>}
            <input name="user" type="text" ref={ inputUserName } placeholder="ユーザーネーム" />
            <button class="btn btn-primary login" type="submit" onClick={registerUser}>登録</button>
        </div>
        
    );
}


export default SignIn;
