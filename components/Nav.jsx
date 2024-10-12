"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { connectToDB } from "@utils/database";
const Nav = () => {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [Provider, setProvider] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setProviders();
  }, []);
  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>

        {/*Desktop Navigation*/}
        <div className="sm:flex hidden">
          {session?.user || active ? (
            <div className="flex gap-3 md:gap-5 ">
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user?.image}
                  alt="logo"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {Provider &&
                Object.values(Provider).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn("google")}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        {/*Mobile Navigation*/}

        <div className="sm:hidden flex relative">
          {session?.user || active ? (
            <div className="flex">
              <Image
                src={session?.user?.image}
                alt="logo"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => {
                  setToggleDropdown((prev) => !prev);
                }}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {Provider &&
                Object.values(Provider).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
