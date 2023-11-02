import { useState } from "react";
import './Student.css'
import { NavLink, useNavigate } from "react-router-dom";
import { auth, firestore } from "../../Backend/Firebase/firebase";
import { ErrorMessage } from "../../MiscComponents/ErrorMessage";
import { db } from "../../Backend/Firebase/firebase";
import {
  getDocs,
  doc,
  collectionGroup,
  query,
  where,
  setDoc
} from 'firebase/firestore';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification, updateProfile } from "firebase/auth";

import { useUserAuth } from "../../Backend/context/UserAuthContext";

const Signup = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const handleSubmission = async () => {
    if (!isValidInput()) {
      return;
    }
  
    setIsLoading(true);
    setErrorMsg("");
    setSubmitButtonDisabled(true);
  
    try {
      const studentSnapshot = await findStudentByEmail(values.email);
      console.log(studentSnapshot.email)
      
      if (studentSnapshot.email === values.email) {
        const user = await createUserAndProfile();
        setIsLoading(false);
        setSubmitButtonDisabled(false);
        alert("Please check your email to activate your account.");
        navigate("/student");
        await logOut();
      } else {
        alert("No records Found");
        setIsLoading(false);
      }
    } catch (err) {
      handleSubmissionError(err);
    }
  };
  
  const isValidInput = () => {
    if ( !values.email || !values.pass ) {
      setErrorMsg("Fill all fields");
      return false;
    } 
    return true;
  };
  
  const findStudentByEmail = async (email) => { 
    const queryPath = 'students';
    const collectionGroupRef = collectionGroup(db, queryPath);
    const studentQuery = query(collectionGroupRef, where('email', '==', email));
    const studentSnapshot = await getDocs(studentQuery);
    return studentSnapshot;
  };
  
  const createUserAndProfile = async () => {
    const res = await createUserWithEmailAndPassword(auth, values.email, values.pass);
    const user = res.user;

    await sendEmailVerification(user);
  
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, {
      email: values.email,
      type: "student",
    });
  
    return user;
  };
  
  const handleSubmissionError = (err) => {
    setIsLoading(false);
    setSubmitButtonDisabled(false);
    setErrorMsg(err.message);
    console.error(err);
  };

  return (
    <div className="auth-body">
      <div className="logincontainer">
        <form
          className="loginform"
          style={{ borderRadius: "10px" }}
          method="POST"
        >
          <h5 class="signuphead" style={{ marginBottom: "30px" }}>
            Sign up to your Student Account
          </h5>
          

          <div class="form-group">
            <input
              type="email"
              class="formcontrol"
              name="email"
              id="email"
              autoComplete="off"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              required
            />
            <label htmlFor="email" style={{ marginLeft: "5px" }}>
              College Email address
            </label>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="formcontrol"
              name="password"
              id="password"
              autoComplete="off"
              value={values.pass}
              onChange={(e) =>
                setValues({ ...values, pass: e.target.value })
              }
              required
            />
            <label htmlFor="password" style={{ marginLeft: "5px" }}>
              Choose your Password
            </label>
          </div>
          {errorMsg && <ErrorMessage message={errorMsg} />}

          <span>
            <p style={{ fontSize: "14px", marginLeft: "10px" }}>
              Already have an account?{" "}
              <NavLink style={{ textDecoration: "none" }} to="/student">
                Log in
              </NavLink>
            </p>
          </span>

          <button
            type="submit"
            name="signup"
            id="signup"
            className="auth-submit"
            onClick={handleSubmission}
            disabled={submitButtonDisabled}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
