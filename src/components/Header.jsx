import React from "react";
import { useLocation } from "react-router-dom"; // Importe useLocation

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "../components/AcmeLogo";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation(); // Utilise le hook useLocation pour obtenir le chemin actuel

  const menuItems = [
    { name: "Characters", path: "/" },
    { name: "Comics", path: "/comics" },
  ];
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="flex flex-row justify-around	">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4 no-underline"
        justify="center"
      >
        {menuItems.map((item, index) => (
          <NavbarItem
            key={index}
            className="no-underline	"
            isActive={isActive(item.path)}
          >
            <Link
              className={`no-underline ${
                isActive(item.path) ? "text-blue-500" : "text-black"
              }`}
              href={item.path}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className={`mt-7 w-full ${
                isActive(item.path) ? "text-blue-500" : "text-black"
              }`}
              href={item.path}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
