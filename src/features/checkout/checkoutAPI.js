const BASE_URL = "http://localhost:8080";

export async function createAddress(address) {
  try {
    const response = await fetch(`${BASE_URL}/addresses`, {
      method: "POST",
      body: JSON.stringify(address),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to send address data: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error creating address:", error.message);
    return { data: null, error: error.message };
  }
}

export async function fetchAddressByUserId(userId) {
  try {
    const response = await fetch(`${BASE_URL}/addresses?userId=${userId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch address: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to fetch address:", error.message);
    return { data: null, error: error.message };
  }
}

export async function updateAddress(update) {
  try {
    const response = await fetch(`${BASE_URL}/addresses/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to update address: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to update address:", error.message);
    return { data: null, error: error.message };
  }
}

export async function deleteAddress(addressId) {
  try {
    const response = await fetch(`${BASE_URL}/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to delete address: ${response.status} ${response.statusText}`
      );
    }
    // const data = await response.json();
    return { data: { id: addressId } };
  } catch (error) {
    console.error("Error to delete address:", error.message);
    return { data: null, error: error.message };
  }
}
