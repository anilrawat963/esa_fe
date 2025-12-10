// small auth helper
const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const USER_KEY = "username";
const GROUP_KEY = "group";

export function saveAuth({ token, role, username, group }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (role) localStorage.setItem(ROLE_KEY, role);
  if (username) localStorage.setItem(USER_KEY, username);
  if (group) localStorage.setItem(GROUP_KEY, group);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(GROUP_KEY);
}

export function getToken(){ return localStorage.getItem(TOKEN_KEY); }
export function getRole(){ return localStorage.getItem(ROLE_KEY); }
export function getUser(){ return localStorage.getItem(USER_KEY); }
export function getGroup(){ return localStorage.getItem(GROUP_KEY); }

export function authFetch(url, opts = {}) {
  const token = getToken();
  const headers = opts.headers ? {...opts.headers} : {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = headers["Content-Type"] || "application/json";
  return fetch(url, { ...opts, headers });
}
