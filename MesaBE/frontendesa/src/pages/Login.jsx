import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const txt = await res.text();
        setErr(txt || "Login failed");
        return;
      }
      const data = await res.json();
      // expected backend AuthResponse: { token, username, designation, user_group }
      saveAuth({ token: data.token, role: data.designation, username: data.username, group: data.user_group });
      nav("/dashboard");
    } catch (e) {
      setErr("Network error");
      console.error(e);
    }
  };

  return (
    <div className="form-card">
      <h2>Sign in</h2>
      <p className="small-muted">Enter your credentials</p>

      <label className="label">Email</label>
      <input className="input" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="you@example.com" />

      <label className="label">Password</label>
      <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

      {err && <p style={{color:"crimson", marginTop:8}}>{err}</p>}

      <div style={{display:"flex", gap:8, marginTop:12}}>
        <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
        <button className="btn btn-ghost" onClick={()=>window.location.href="/register"}>Register</button>
      </div>
    </div>
  );
}
