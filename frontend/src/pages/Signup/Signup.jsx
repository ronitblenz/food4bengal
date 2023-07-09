import styles from "./signup.module.css";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useState } from "react";
//import { useHistory } from "react-router-dom";



const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [response, setResponse] = useState()
//  const history = useHistory()


  const login = async () => {
    window.open(`${process.env.REACT_APP_PUBLIC_URL}/auth/google`, '_self')
  }

  const loginfb = async () => {
    window.open(`${process.env.REACT_APP_PUBLIC_URL}/auth/facebook/callback`, '_self')
  }

  


  const handleSignUp = async (e) => {
    e.preventDefault()


    try {
      if (name === '' || email === '' || password === '' || confirmPassword === '') return
      if (password !== confirmPassword) return


      const { data } = await axios.post('/auth/register', { name, email, password })
      //if(data.status === 201) history.push('/')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.main}>
      <h1>Sign up</h1>
      <form className={styles.form}>
        <input type="text" id="name" onChange={(e) => setName(e.target.value)} name="name" placeholder="Name" />
        <input onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          name="email"
          placeholder="Email Address "
        />
        <input onChange={(e) => setPassword(e.target.value)}
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input onChange={(e) => setConfirmPassword(e.target.value)}
          type="text"
          id="password"
          name="password"
          placeholder="Confirm Password"
        />
        <button type="submit" onClick={handleSignUp} className={styles.signup_btn}>Sign up</button>
      </form>

      <div className={styles.or}>
        <div className={styles.number}>
          <p>or</p>
        </div>
      </div>

      <div className={styles.lower}>
        <p className={styles.signUpWith}>Sign up with</p>
        <div onClick={login} className={styles.google}>
          <FcGoogle className={styles.iconGoogle} />
          <p>Login with Google</p>
        </div>
        <div className={styles.google} onClick={loginfb} >
          <BsFacebook className={styles.iconFb} />
          <p>Login with Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
