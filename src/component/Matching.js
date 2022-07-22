import { useContext, useEffect, useState } from 'react';
import { UserNameContext } from "../App"
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { matching } from "../processing/firestore"
import Header from './Header';
import "../css/Matching.css";
import handImg from "../image/hand.png"

function Matching() {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserNameContext);

    useEffect(() => {
        // データが保持されていなければsignin画面に移動
        if (!userInfo.userName) {
            navigate('/SignIn'); 
        }
                     
    },[]);
    

    return (
      <div>
        <Header />
        <div class="container">
            <StatusButton />
            <ResutlMatching />
        </div>
      </div>
    );
}
  
function StatusButton() {
    const {userInfo, setUserInfo} = useContext(UserNameContext);

    const selectStatus = (e) => {
        const status = e;
        // useStateにおいてobjectの一部を更新する場合
        setUserInfo(userInfo => ({...userInfo, status: status}));
        
    }

    return(
    
        <section class="jumbotron text-center my-5">
            <br></br>
            <p class="lead text-muted">ステータスを選択しましょう。現在のステータス: </p>
            <p>
                <button type="button" class="btn btn-primary me-md-3" onClick={() => selectStatus("休憩中")}>休憩中</button>
                <button type="button" class="btn btn-success me-md-3" onClick={() => selectStatus("作業中")}>作業中</button>
                <button type="button" class="btn btn-secondary me-md-3" onClick={() => selectStatus("集中モード")}>集中モード</button>
                <button type="button" class="btn btn-warning me-md-3" onClick={() => selectStatus("離席中")}>離席中</button>
                <button type="button" class="btn btn-dark" onClick={() => selectStatus("帰宅")}>帰宅</button>
            </p>
            <br/>
            <p>
                <button type="button" class="btn btn-info me-md-3" onClick={() => selectStatus("お悩み中")}>お悩み中</button>
                <button type="button" class="btn btn-danger" onClick={() => selectStatus("超お悩み中")}>超お悩み中</button>
            </p>     
        </section>
            
        
    );
}

function ResutlMatching() {
    const {userInfo, setUserInfo} = useContext(UserNameContext);
    const [matchUsers, setMatchUsers] = useState([])


    useEffect(() => {
        matching(userInfo.status)
            .then((matchUsers) => {
                
                setMatchUsers(matchUsers);
                
            });

    },[userInfo.status]);

    return(
        <div>
            <div class="d-flex align-items-center p-3 my-3 text-white green rounded shadow-sm">

                    <div class="lh-1 me-md-3">
                        <h1 class="h6 mb-0 text-white lh-1">matching...!!!</h1>
                    </div>
                    
                    <button type="button" class="btn btn-outline-success text-white border-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z">
                            </path>
                            <path
                                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z">
                            </path>
                        </svg>
                        更新
                    </button>
            </div>

            <div>

                    <div class="row">
                        {matchUsers.map((matchUser) => 
                            <div class="col-lg-4"><img src={handImg} alt="挙手画像" />
                                <h2>{ matchUser.userName }</h2>
                                <p class="text-muted">{ matchUser.status }</p>
                            </div>
                        )}
                    </div>
                    
            </div>
        </div>
    );
}

export default Matching;
