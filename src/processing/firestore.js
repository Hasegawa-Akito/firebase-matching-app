import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

async function user_exist(user) {
    
    // ユーザーがデータベースに存在するか
    const userSnapshot = await getDoc(doc(db, 'user', user.uid));
    const exist =  userSnapshot.exists();

    if (exist) {
        const userData = userSnapshot.data()
        const uid = userSnapshot.id;
        const userName = userData.userName;
        const userConfirm = userData.userConfirm;
        
        return {userName: userName, userConfirm: userConfirm, uid: uid};
    }
    else {
        return {}
    }
}

async function register_user(userInfo) {
    await setDoc(doc(db, "user", userInfo.uid), {
            userName: userInfo.userName,
            userConfirm: userInfo.userConfirm,
            status: "作業中"
    });
}

export { user_exist, register_user };