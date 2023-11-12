import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend endpoint
      await axios.post("http://localhost:5000/api/users", formData);

      // Reset the form after successful submission
      setFormData({
        name: "",
        age: "",
        email: "",
        dob: "",
      });

      alert("User added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding user");
    }
  };

  const [nameErr, setparagraph] = useState("");
  const [emailErrMsg, setmail] = useState("");
  const [ageErrMsg, setage] = useState("");

  const namehandle = (event) => {
    let nameValue = event.target.value;
    if (nameValue === "") {
      setparagraph("Required*");
    } else {
      setparagraph("");
    }
  };

  const emailhandle = (event) => {
    let emailValue = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
      setmail("Required*");
    } else if (!emailRegex.test(emailValue)) {
      setmail("Invalid email format*");
    } else {
      setmail("");
    }
  };

  const agehandle = (event) => {
    const num = event.target.value;
    if (num === "") {
      setage("Required*");
    } else if (!Number.isInteger(Number(num)) || Number(num) < 0) {
      setage("please provide valid input*");
    } else {
      setage("");
    }
  };

  return (
    <div>
      <form id="userForm" onSubmit={handleSubmit}>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          onBlur={namehandle}
          name="name"
          required
          onChange={handleChange}
        />
        <p id="nameErrMsg" class="error">
          {nameErr}
        </p>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          onBlur={emailhandle}
          required
        />
        <p id="emailErrMsg" class="error">
          {emailErrMsg}
        </p>

        <label for="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          onChange={handleChange}
          onBlur={agehandle}
          required
        />
        <p id="ageErrMsg" class="error">
          {ageErrMsg}
        </p>

        <label for="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
        <div id="errorMessages"></div>
      </form>
    </div>
  );
}

export default App;
