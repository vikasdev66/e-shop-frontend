export async function createOrder(order) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
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
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/orders/own/?userId=${userId}`
    );
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

export async function updateOrder(order) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/orders/${order.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update order: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to update order:", error.message);
    return { data: null, error: error.message };
  }
}

export async function fetchAllOrders(sort, pagination) {
  try {
    let queryString = "";
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/orders?${queryString}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch orders: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    return { data: { orders: data, totalOrders: +totalOrders } };
  } catch (error) {
    console.error("Error to fetch orders:", error.message);
    return { data: null, error: error.message };
  }
}
