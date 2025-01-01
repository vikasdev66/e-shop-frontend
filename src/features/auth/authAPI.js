export async function createUser(userData) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
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

export async function checkUser(loginInfo) {
  try {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users?email=` + email
    );
    if (!response.ok) {
      throw new Error(
        `Failed to verify user: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    if (data.length) {
      if (data[0].password === password) {
        return { data: data[0] };
      } else {
        return { error: "wrong credentials" };
      }
    }
    return { error: "wrong credentials" };
  } catch (error) {
    console.error("Error verifying user:", error.message);
    return { data: null, error: error.message };
  }
}

export async function signOut(userId) {
  try {
    return { data: "success" };
  } catch (error) {
    console.error("Error verifying user:", error.message);
    return { data: null, error: error.message };
  }
}
