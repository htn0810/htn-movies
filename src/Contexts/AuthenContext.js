import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebaseConfig";

const AuthenContext = createContext({});

export const AuthenProvider = ({ children, ...props }) => {
  let [userAccount, setUserAccount] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const colRef = collection(db, "users");
        const q = query(colRef, where("email", "==", user?.email));
        onSnapshot(q, (snapshot) => {
          snapshot.docs.forEach((doc) => {
            setUserAccount({ id: doc.id, ...doc.data() });
          });
        });
      } else setUserAccount(null);
    });
  }, []);
  return (
    <AuthenContext.Provider value={{ userAccount, setUserAccount }} {...props}>
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthenContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthenProvider");
  return context;
};
