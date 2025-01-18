export async function fetchLoggedInUser() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/own`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch user details: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to fetch user details:", error.message);
    return { data: null, error: error.message };
  }
}

export async function updateUser(update) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${update.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update user: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to update user:", error.message);
    return { data: null, error: error.message };
  }
}

export async function createAddress(address) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/addresses`,
      {
        method: "POST",
        body: JSON.stringify(address),
        headers: {
          "content-type": "application/json",
        },
      }
    );
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

export async function fetchAddressByUserId() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/addresses/own`
    );
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
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/addresses/${update.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "content-type": "application/json",
        },
      }
    );
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
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to delete address: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data: { id: data.id } };
  } catch (error) {
    console.error("Error to delete address:", error.message);
    return { data: null, error: error.message };
  }
}
