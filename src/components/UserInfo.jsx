import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {userData ? (
        <>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserInfo;
