import React from "react";
import { Button } from "reactstrap";

import styles from "./ActionButton.module.scss";

interface ActionButtonProps {
  label: string;
  outline?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  borderRadiusLeft?: boolean;
  borderRadiusRight?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  outline = false,
  onClick,
  fullWidth = false,
  borderRadiusRight = false,
  borderRadiusLeft = false,
}) => {
  const buttonClass = outline
    ? `${styles.actionButton}  ${styles.btn__outline__custom__danger}`
    : `${styles.actionButton} ${styles.btn__custom__danger}`;
  const buttonClassWidth = fullWidth && `${styles.fullWidth} `;
  const buttonClassRadious =
    (borderRadiusRight && `${styles.border__Radius__Right}  `) ||
    (borderRadiusLeft && `${styles.border__Radius__Left} `);
  const buttonClassRadiousCustom = borderRadiusLeft
    ? borderRadiusRight && borderRadiusRight && `${styles.border__Radius__Custom} `
    : "";

  return (
    <Button
      className={`${buttonClass} ${buttonClassWidth} ${buttonClassRadious} ${buttonClassRadiousCustom}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
