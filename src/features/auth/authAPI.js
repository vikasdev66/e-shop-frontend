export async function createUser(userData) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to send user data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { data: null, error: error.message };
  }
}

export async function loginUser(loginInfo) {
  try {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error("Error verifying user:", error.message);
    return { data: null, error: error.message };
  }
}

export async function checkAuth() {
  try {
    const response = await fetch("http://localhost:8080/auth/check");
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    console.error("Error verifying user:", error.message);
    return { data: null, error: error.message };
  }
}

export async function signOut() {
  try {
    return { data: "success" };
  } catch (error) {
    console.error("Error verifying user:", error.message);
    return { data: null, error: error.message };
  }
}
