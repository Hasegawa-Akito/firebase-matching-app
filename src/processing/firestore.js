import { query, where, collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore/lite';
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
        const status = userData.status;
        
        return {userName: userName, userConfirm: userConfirm, uid: uid, status: status};
    }
    else {
        return {}
    }
}

async function register_user(userInfo) {
    await setDoc(doc(db, "user", userInfo.uid), {
            userName: userInfo.userName,
            userConfirm: userInfo.userConfirm,
            status: userInfo.status
    });
}

async function matching(status) {

    let q;
    if (status === "お悩み中" || status === "超お悩み中") {
        q = query(collection(db, "user"), where("status", "in", ["休憩中", "暇"]));
    }
    else if (status === "暇" || status === "休憩中") {
        q = query(collection(db, "user"), where("status", "in", ["お悩み中", "超お悩み中"]));
    }
    else {
        return []; //matching対象外は空を返す
    }
    
    const matchDocs = await getDocs(q);
    let matchUsers = []
    matchDocs.forEach((doc) => {
        matchUsers.push(doc.data());
    })
    return matchUsers;

}

export { user_exist, register_user, matching };