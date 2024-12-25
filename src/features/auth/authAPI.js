const BASE_URL = "http://localhost:8080";

export async function createUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
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
