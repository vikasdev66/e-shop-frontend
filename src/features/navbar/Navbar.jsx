import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";

const navigation = [
  { name: "Dashboard", link: "/", admin: true, user: true },
  { name: "Admin", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];

const userNavigation = [
  { name: "Profile", link: "/user-profile" },
  { name: "Orders", link: "/orders" },
  { name: "Sign out", link: "/signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ children }) {
  const cartItems = useSelector(selectCart);
  const user = useSelector(selectUserInfo);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link to={"/"}>
                        <img
                          className="h-10 w-10"
                          src={"/eshop.webp"}
                          alt="e-shop"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item, index) =>
                          item[user?.userInfo?.role] ? (
                            <NavLink
                              key={index}
                              to={item.link}
                              className={({ isActive }) =>
                                classNames(
                                  isActive
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )
                              }
                              aria-current={item.current ? "page" : undefined}
                              end
                            >
                              {item.name}
                            </NavLink>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to={"/cart"}>
                        <button
                          type="button"
                          className="flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <ShoppingCartIcon
                            aria-hidden="true"
                            className="size-6"
                          />
                          {cartItems &&
                            cartItems.filter((item) => item !== null).length >
                              0 && (
                              <span className="inline-flex items-center rounded-md -ml-2 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                {
                                  cartItems.filter((item) => item !== null)
                                    .length
                                }
                              </span>
                            )}
                        </button>
                      </Link>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button
                            className={`flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ${
                              !user?.userInfo?.imageUrl
                                ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                                : "focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            }`}
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className={`h-8 w-8 rounded-full ${
                                !user?.userInfo?.imageUrl
                                  ? "text-white flex items-center justify-center"
                                  : ""
                              }`}
                              src={user?.userInfo?.imageUrl}
                              alt={user?.userInfo?.name[0]?.toUpperCase()}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.link}
                                    // href={item.link}
                                    className={({ isActive }) =>
                                      classNames(
                                        isActive
                                          ? "bg-gray-200"
                                          : "hover:bg-gray-100",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )
                                    }
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item, index) => (
                    <Disclosure.Button
                      key={index}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <Link to={"/cart"}>
                      <button
                        type="button"
                        className="flex relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          aria-hidden="true"
                          className="size-6"
                        />
                        <span className="inline-flex items-center rounded-md -ml-2 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          3
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item, index) => (
                      <Disclosure.Button
                        key={index}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              E-Shop
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
