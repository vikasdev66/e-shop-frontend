export async function addToCart(item) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to send add to cart data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error add to cart:", error.message);
    return { data: null, error: error.message };
  }
}

export async function fetchCartItemsByUserId(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch cart items: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to fetch cart items:", error.message);
    return { data: null, error: error.message };
  }
}

export async function updateCart(update) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update cart: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to update cart:", error.message);
    return { data: null, error: error.message };
  }
}

export async function deleteItemFromCart(itemId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete item from cart: ${response.status} ${response.statusText}`
      );
    }
    // const data = await response.json();
    return { data: { id: itemId } };
  } catch (error) {
    console.error("Error to delete item from cart:", error.message);
    return { data: null, error: error.message };
  }
}
