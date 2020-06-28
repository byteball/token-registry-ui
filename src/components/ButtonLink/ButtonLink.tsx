import React from "react";

import styles from "./ButtonLink.module.css";

export const ButtonLink: React.FC<any> = ({
  children,
  type = "link",
  ...rest
}) => {
  return (
    <span
      {...rest}
      className={
        type === "link" ? styles.buttonLink : "ant-btn ant-btn-primary"
      }
    >
      {children}
    </span>
  );
};
