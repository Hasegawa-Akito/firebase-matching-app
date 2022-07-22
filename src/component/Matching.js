import { useContext, useEffect } from 'react';
import { UserNameContext } from "../App"
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

function Matching() {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserNameContext);

    useEffect(() => {
        // データが保持されていなければsignin画面に移動
        if (!userInfo.userName) {
            navigate('/SignIn'); 
        }
                     
    },[]);
    console.log(userInfo);

    console.log(getCities(db))

    async function getCities(db) {

        const citiesCol = await collection(db, 'user');
        const citySnapshot = await getDocs(citiesCol);
        
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
    }

    return (
      <div className="App">
        マッチング
      </div>
    );
  }
  
  
  export default Matching;
  