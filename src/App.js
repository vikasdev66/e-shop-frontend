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
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserAsync,
  fetchAddressByUserIdAsync,
} from "./features/user/userSlice";
import { setLoading } from "./features/loading/loadingSlice";
import { fetchCartItemsByUserIdAsync } from "./features/cart/cartSlice";
import SignOut from "./features/signOut/SignOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Protected>
        <Home />
      </Protected>
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
    path: "user-profile",
    element: (
      <Protected>
        <UserProfilePage />
      </Protected>
    ),
  },
  {
    path: "signOut",
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

  useEffect(() => {
    dispatch(setLoading(true));
    if (user) {
      dispatch(fetchLoggedInUserAsync(user.id));
      dispatch(fetchCartItemsByUserIdAsync(user.id));
      dispatch(fetchAddressByUserIdAsync(user.id));
    }
    dispatch(setLoading(false));
  }, [user?.id]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
