import { useState } from "react";
import axios from "axios";


const SignIn = ({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
        header: {
          "Content-Type": "application/json",
        },
    };

    const loginData = {
        "username": `${username}`,
        "password": `${password}`
    }

     try {
      //Post request login API:lle. 
      //Setting JWT Token from response to localStorage
      const { data } = await axios.post("http://localhost:4000/login", loginData, config);
      localStorage.setItem("authToken", data.accessToken);
      history.push("/Home");       
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Log in to your account</h1>
      <form onSubmit={loginHandler}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log in</button>
      </form>
      <div>
        <h3>username: user, password: 123</h3>
        <h3>username: admin, password: 123</h3>
      </div>
    </div>
  );
}

export default SignIn;