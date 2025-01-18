import { useEffect } from "react";
import Protected from "./features/auth/components/Protected";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PageNotFound from "./pages/404Page";
import OrdersPage from "./pages/OrdersPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserProfilePage from "./pages/UserProfilePage";
import {
  selectLoggedInUser,
  checkAuthAsync,
  selectUserChecked,
} from "./features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserAsync,
  fetchAddressByUserIdAsync,
} from "./features/user/userSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import SignOut from "./features/signOut/SignOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import "./App.css";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import ProductFormPage from "./pages/ProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },

  {
    path: "admin/product-form",
    element: (
      <ProtectedAdmin>
        <ProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <ProductFormPage />
      </ProtectedAdmin>
    ),
  },
  { path: "login", element: <LoginPage /> },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <CheckoutPage />
      </Protected>
    ),
  },
  {
    path: "product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />{" "}
      </Protected>
    ),
  },
  {
    path: "admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "order-placed/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
  {
    path: "orders",
    element: (
      <Protected>
        <OrdersPage />
      </Protected>
    ),
  },
  {
    path: "admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "user-profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "signout",
    element: (
      <Protected>
        <SignOut />
      </Protected>
    ),
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: (
      <Protected>
        <PageNotFound />
      </Protected>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync());
      dispatch(fetchCartItemsByUserIdAsync());
      dispatch(fetchAddressByUserIdAsync());
    }
  }, [!!user, dispatch]);

  return (
    <div className="App">
      {userChecked && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
