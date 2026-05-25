export interface CloakUser {
  id: string;
  name: string;
  email: string;
  password: string;
  mustReset: boolean;
}

export interface CloakSession {
  id: string;
  name: string;
  email: string;
}

const DEFAULT_USERS: CloakUser[] = [
  { id: "1", name: "Daniel", email: "daniel@mythos.agency", password: "0000", mustReset: true },
  { id: "2", name: "Shahar", email: "shahar@mythos.agency", password: "0000", mustReset: true },
  { id: "3", name: "Staff", email: "staff@mythos.agency", password: "0000", mustReset: true },
];

export function initUsers(): CloakUser[] {
  const stored = localStorage.getItem("cloak_users");
  if (!stored) {
    localStorage.setItem("cloak_users", JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(stored);
}

export function getUsers(): CloakUser[] {
  const stored = localStorage.getItem("cloak_users");
  if (!stored) return initUsers();
  return JSON.parse(stored);
}

export function saveUsers(users: CloakUser[]) {
  localStorage.setItem("cloak_users", JSON.stringify(users));
}

export function getSession(): CloakSession | null {
  const stored = localStorage.getItem("cloak_session");
  if (!stored) return null;
  return JSON.parse(stored);
}

export function setSession(user: CloakUser) {
  const session: CloakSession = { id: user.id, name: user.name, email: user.email };
  localStorage.setItem("cloak_session", JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem("cloak_session");
}

export function login(email: string, password: string): { user: CloakUser } | { error: string } {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { error: "פרטי הכניסה שגויים." };
  if (user.password !== password) return { error: "פרטי הכניסה שגויים." };
  return { user };
}

export function updatePassword(userId: string, newPassword: string) {
  const users = getUsers();
  const updated = users.map((u) =>
    u.id === userId ? { ...u, password: newPassword, mustReset: false } : u
  );
  saveUsers(updated);
}
