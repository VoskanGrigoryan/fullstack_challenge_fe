"use client";

import React from "react";
import { useState } from "react";
import {
  IconLogout,
  IconHome,
  IconFilePlus,
  IconCheckupList,
} from "@tabler/icons-react";
import classes from "./NavbarSegmented.module.css";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconHome },
  { link: "/new-project", label: "New project", icon: IconFilePlus },
  { link: "/user-tasks", label: "My tasks", icon: IconCheckupList },
];

export default function Container({ children }: IProps) {
  const [active, setActive] = useState("Dashboard");

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <div style={{ display: "flex" }}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>{links}</div>

        <div className={classes.footer}>
          <Link
            href="/auth/login"
            className={classes.link}
            // onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
