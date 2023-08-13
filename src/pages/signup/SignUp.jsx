import { useState } from "react";
import "./signup.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDocumentToCollection } from "../../firebaseQueries";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const [error, setError] = useState(false);
  const [errorrepeatpassword, setErrorPasswordMismatch] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== repeatpassword) {
      setErrorPasswordMismatch(true);
    } else {
      signUp();
    }
  };

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const role = "user";
      const userData = {
        firstname,
        lastname,
        email,
        role,
        displayName: firstname + " " + lastname,
        phone: "",
        timeStamp: serverTimestamp(),
        username: "",
        id: userCredential.user.uid,
      };
      await addDocumentToCollection("users", userCredential.user.uid, userData);
      navigate("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          required
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button type="submit">SignUp</button>
        {error && <span>User Creation Error. Contact System Admin!</span>}
        {errorrepeatpassword && <span>Password Mismatch!</span>}
      </form>
      <div></div>
    </div>
  );
};

export default SignUp;
