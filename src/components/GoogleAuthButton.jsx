import { useEffect } from "react";
import api from "../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/ProductContext";

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const { setCurrentUser, setUserData } = useContext(Context);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      {
        theme: "outline",
        size: "large",
        width: 380,
      }
    );
  }, []);

  async function handleGoogleResponse(response) {
    try {
      // Send Google ID token to backend
      const res = await api.post("/api/auth/google", {
        credential: response.credential,
      });

      const { accessToken, user } = res.data;

      localStorage.setItem("accessToken", accessToken);
      setCurrentUser(user.id);
      setUserData(user);

      toast.success("Logged in with Google");

      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      toast.error("Google login failed");
      console.error(err);
    }
  }

  return <div id="googleBtn" className="flex justify-center" />;
}
