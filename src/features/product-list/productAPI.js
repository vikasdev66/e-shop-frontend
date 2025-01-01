export async function fetchAllProducts() {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: [], error: error.message };
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${id}`
    );
    if (!response.ok) throw new Error("Failed to fetch product by ID");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: null, error: error.message };
  }
}

export async function fetchAllProductsBrands() {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/brands`);
    if (!response.ok) throw new Error("Failed to fetch brands");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: [], error: error.message };
  }
}

export async function fetchAllProductsCategories() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/categories`
    );
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: [], error: error.message };
  }
}

export async function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = "";
  if (filter) {
    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length > 0) {
        const lastCategoryValue = categoryValues[categoryValues.length - 1];
        queryString += `${key}=${lastCategoryValue}&`;
      }
    }
  }
  if (sort) {
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
  }
  if (pagination) {
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products?${queryString}`
    );
    if (!response.ok) throw new Error("Failed to fetch products with filters");
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    return { data: { products: data, totalItems: totalItems } };
  } catch (error) {
    console.error(error);
    return { data: { products: [], totalItems: 0 }, error: error.message };
  }
}

export async function createProduct(product) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to add Product: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error add to Product:", error.message);
    return { data: null, error: error.message };
  }
}

export async function updateProduct(update) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/products/${update.id}`,
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
        `Failed to update product: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error to update product:", error.message);
    return { data: null, error: error.message };
  }
}
