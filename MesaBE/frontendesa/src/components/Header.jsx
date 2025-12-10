import React from "react";
import { getUser, clearAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Header({ onNewEvent, searchQuery, onSearchChange }){
  const nav = useNavigate();
  const username = getUser();

  const logout = () => {
    clearAuth();
    nav("/login");
  };

  return (
    <div className="header">
      <div style={{display:"flex", gap:12, alignItems:"center"}}>
        <button className="btn btn-ghost" onClick={onNewEvent}>+ New Event</button>
        <input value={searchQuery} onChange={(e)=>onSearchChange(e.target.value)} placeholder="Search events..." style={{padding:8,borderRadius:8,border:"1px solid #e6eefb"}}/>
      </div>

      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        <div style={{textAlign:"right"}}>
          <div style={{fontWeight:700}}>{username || "Guest"}</div>
          <div style={{fontSize:12,color:"#64748b"}}>Welcome</div>
        </div>
        <button className="btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
