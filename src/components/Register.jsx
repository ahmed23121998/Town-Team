import React, { useState } from "react";
import { auth, db } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      // حفظ المستخدم في Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "user",
        createdAt: new Date(),
      });

      alert("✅ Registered and saved in Firestore!");
    } catch (error) {
      console.error("❌ Error registering:", error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        placeholder="Full Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
