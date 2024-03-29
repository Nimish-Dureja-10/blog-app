"use client"

import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { useState } from "react";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links = ({session}) => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const isAdmin = true;

  return (
    <div className={styles.container}>
        <div className={styles.links}>
        {links.map((link) => (
            <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
            <>
            {session?.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
            </>
        ) : (
            <NavLink item={{ title: "Login", path: "/login" }} />
        )}
        </div>
        <button className={styles.menuBtn} onClick={()=>setOpen((prev)=>!prev)}>≡</button>
        
        {
            open && (
                <div className={styles.mobileLinks}>
                    {
                        links.map((link)=>(
                            <NavLink item={link} key={link.title} />
                        ))
                    }
                </div>
            )
        }
    </div>  
  );
};

export default Links;
