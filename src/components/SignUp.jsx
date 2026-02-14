import { useState } from "react";
import { SignupForm } from "./signup-form";
import { useAuth } from "../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"

const SignUp = () => {

  const { signUp, isLoading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log(email)
    e.preventDefault()
    try {
      await signUp(email, pass);
      if (user) navigate("/test");
    } catch (error) {
      console.log("error:", error);
    }

    console.log(pass)
  }

  return (
    <div className="dark bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        {/* <SignupForm /> */}
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" name="pass" placeholder='pass' onChange={(e) => setPass(e.target.value)} />
      <button type="submit">sign up</button>
    </form>
      </div>
    </div>
  );
};

export default SignUp;
