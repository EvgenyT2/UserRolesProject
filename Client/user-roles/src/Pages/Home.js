import React, { useEffect, useState } from "react";
import axios from "axios";
import Admin from "../Components/Admin";
import User from "../Components/User";


const Home = () => {
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        // Request home API with JWT Token from localStorage 
        const { data } = await axios.get("http://localhost:4000/home", config);
        console.log(data);
        setUserRole(data[0].role);
        setUserData(data[0]);
      } catch (error) {
        localStorage.removeItem("authToken");
      }
    };

    fetchPrivateDate();
  }, []);
  console.log(userRole);

  return (
    
    <div>
      <h1>Home Page</h1>
      <div>
        <h3>Username: {userData.username}</h3>
        {userRole === "admin"? <Admin />: userRole === "user"? <User /> : <div>error</div> }     
      </div>
    </div>
  );
}

export default Home;