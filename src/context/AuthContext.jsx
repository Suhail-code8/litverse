import { createContext, useState } from "react";

export const AuthContext = createContext("");


export default function AuthProvider({ children }) {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [mailAlert, setMailAlert] = useState("");
  const [passAlert, setPassAlert] = useState("");
  function getName(e) {
    setName(e.target.value);
  }
  function getPass(e) {
    setPass(e.target.value);
  }
  function getMail(e) {
    setMail(e.target.value);
  }
const API = import.meta.env.VITE_API_URL || "https://litverse-db.onrender.com";

  return (
    <AuthContext.Provider
      value={{
        name,
        setName,
        pass,
        setPass,
        mail,
        setMail,
        mailAlert,
        setMailAlert,
        passAlert,
        setPassAlert,
        getName,
        getPass,
        getMail,
       
      }}
    >
    {children}
    </AuthContext.Provider>
  );
}
