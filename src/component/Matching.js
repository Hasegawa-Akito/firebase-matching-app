import {useContext} from 'react';
import {UserNameContext} from "../App"
function Matching() {
    const {userInfo, setUserInfo} = useContext(UserNameContext);
    console.log(userInfo);
    
    return (
      <div className="App">
        マッチング
      </div>
    );
  }
  
  
  export default Matching;
  