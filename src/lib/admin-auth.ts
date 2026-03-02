const ADMIN_USER = 'admin';
const ADMIN_PASS = '123456';
const AUTH_KEY = 'fpt-admin-isLoggedIn';

export function adminLogin(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function adminLogout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
