const BASE_URL = "http://localhost:8080";

export async function createOrder(order) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to place order: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to place order:", error.message);
    return { data: null, error: error.message };
  }
}

export async function fetchOrders(userId) {
  try {
    const response = await fetch(`${BASE_URL}/orders?userId=${userId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to place order: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to place order:", error.message);
    return { data: null, error: error.message };
  }
}
