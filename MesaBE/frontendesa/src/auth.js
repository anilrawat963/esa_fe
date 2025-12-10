// src/auth.js
export function saveAuth({ token, username, role, group }) {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("role", role);
  localStorage.setItem("group", group);
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("group");
}

export function getAuth() {
  return {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    group: localStorage.getItem("group"),
  };
}
