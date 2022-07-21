import {useContext} from 'react';
import {UserNameContext} from "../App"
import { collection, getDocs, doc, setDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

function Matching() {
    const {userInfo, setUserInfo} = useContext(UserNameContext);
    console.log(userInfo.uid);

    console.log(getCities(db))

    async function getCities(db) {
        await setDoc(doc(db, "user", userInfo.uid), {
            userName: userInfo.userName,
            userConfirm: userInfo.userConfirm,
            status: "作業中"
        });

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
  