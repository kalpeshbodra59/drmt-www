import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import DiamondOutline from "../../assets/svg/diamond-outline.svg";
import constants from "../../utilities/constants";
import Image from "../Common/Image";

const navigationOptions = [
  { id: 1, name: "Dashboard", href: "/" },
  { id: 2, name: "Worker", href: "/worker" },
  { id: 3, name: "Logout", href: "/login" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    constants.setAuthTokenInSessionStorage(null);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-8"
                    src={DiamondOutline}
                    alt="Your Company"
                    onClick={handleLogoClick}
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigationOptions.map(({ name, href }) => (
                      <Link
                        key={name}
                        to={href}
                        className={classNames(
                          window.location.pathname === href
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={window.location.pathname === href ? "page" : undefined}
                        onClick={() => href === "/login" && handleLogout()}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigationOptions.map(({ name, href }) => (
                <Disclosure.Button
                  key={name}
                  as="a"
                  href={href}
                  className={classNames(
                    window.location.pathname === href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={window.location.pathname === href ? "page" : undefined}
                  onClick={() => href === "/login" && handleLogout()}
                >
                  {name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
