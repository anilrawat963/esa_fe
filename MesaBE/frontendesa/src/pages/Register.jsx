import React, { useState } from "react";
import axios from "axios";
import "./Registration.css"; // Import CSS

function Registration() {

  const [form, setForm] = useState({
    username: "",
    password: "",
    userGroup: "",
    designation: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", form);

      setMessage("Registration successful!");
    } catch (err) {
      setMessage("Registration failed. Try again!");
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-box">
        <h2>Create Account</h2>

        <form onSubmit={submitHandler} className="reg-form">

          <input
            type="email"
            name="username"
            placeholder="Email"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="userGroup"
            value={form.userGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Group</option>
            <option value="A">Group A</option>
            <option value="B">Group B</option>
            <option value="C">Group C</option>
          </select>

          <select
            name="designation"
            value={form.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>

          <button type="submit" className="reg-btn">Register</button>
        </form>

        {message && <p className="message">{message}</p>}

        <a href="/login" className="login-link">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
}

export default Registration;
