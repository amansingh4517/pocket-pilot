const tokenKey = "pocketpilot.token";
export const token = () => sessionStorage.getItem(tokenKey);
export const signIn = (value) => sessionStorage.setItem(tokenKey, value);
export const signOut = () => sessionStorage.removeItem(tokenKey);

export async function api(path, { method = "GET", body, signal } = {}) {
  const current = token();
  const headers = {};
  if (current) headers.Authorization = "Bearer " + current;
  if (body) headers["Content-Type"] = "application/json";
  let response;
  try {
    response = await fetch("/api/" + path, {
      method,
      headers,
      signal,
      body: JSON.stringify(body),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new Error(
      "Could not reach PocketPilot. Check your connection and try again.",
    );
  }
  if (response.status === 401 && current && current === token()) {
    signOut();
    window.dispatchEvent(new Event("session-expired"));
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.success) {
    throw new Error(
      result?.message ||
        "The API is unavailable. Check the backend and try again.",
    );
  }
  return result.data;
}
