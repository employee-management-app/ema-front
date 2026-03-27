export const getTokenFromLocalStorage = () => {
  const auth = window.localStorage.getItem('auth');

  if (!auth) {
    return null;
  }

  try {
    JSON.parse(auth);
    return null;
  } catch {
    return auth;
  }
};
