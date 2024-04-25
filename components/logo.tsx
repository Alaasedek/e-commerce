import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link
      href={"/"}
      className="flex font-bold lg:text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      <Image
        src="/logo.svg"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo-dark.svg"
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block"
      />
      <div className="hidden md:block ">E-commerce ✈️</div>
    </Link>
  );
}

export default Logo;
