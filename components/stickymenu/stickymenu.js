import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./stickymenu.module.scss";
import Link from "next/link";
import Icon from "../core/icon/icon";
import PropTypes from "prop-types";
import Button from "../core/button/button";
import renderClass from "../../utils/renderClass";

export default function StickyMenu({ pages }) {
  const path = usePathname();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [path]);

  const isActive = (page) => page == path;
  const buttonIcon = show ? "close" : "menu";

  return (
    <div className={renderClass([styles.sticky, show ? styles.large : ""])}>
      <Button iconOnly icon={buttonIcon} onClick={() => setShow(!show)} />
      <nav className={renderClass([show ? styles.show : ""])}>
        {pages?.map(({ id, name, icon, path }) => (
          <Link
            href={path}
            key={id}
            className={isActive(path) ? styles.active : ""}
          >
            <Icon type={icon} />
            {name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

StickyMenu.propTypes = {
  pages: PropTypes.array,
};
