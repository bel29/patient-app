export const selectUserContext = () => {
  return JSON.parse(JSON.parse(sessionStorage.getItem("persist:root") || "").user) || null;
};
