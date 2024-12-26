import Protected from "./features/auth/components/Protected";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: (
//           <Protected>
//             <Home />
//           </Protected>
//         ),
//       },
//       { path: "login", element: <LoginPage /> },
//       {
//         path: "signup",
//         element: (
//           <Protected>
//             <SignupPage />{" "}
//           </Protected>
//         ),
//       },
//       {
//         path: "cart",
//         element: (
//           <Protected>
//             <CartPage />
//           </Protected>
//         ),
//       },
//       {
//         path: "checkout",
//         element: (
//           <Protected>
//             <CheckoutPage />
//           </Protected>
//         ),
//       },
//       {
//         path: "product-detail/:id",
//         element: (
//           <Protected>
//             <ProductDetailPage />{" "}
//           </Protected>
//         ),
//       },
//     ],
//   },
// ]);

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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
