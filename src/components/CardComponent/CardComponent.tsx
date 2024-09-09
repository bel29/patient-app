import { FC, ReactNode } from "react";
import styles from "./CardComponent.module.scss";

interface CardComponentProps {
  /**
   * El contenido que se mostrará dentro de la tarjeta.
   */
  children: ReactNode;

  /**
   * Tipo de borde de la tarjeta.
   * - `none`: Sin borde (por defecto)
   * - `solid`: Borde sólido
   * - `dashed`: Borde discontinuo
   * - `underline`: Solo borde inferior
   */
  border?: "none" | "solid" | "dashed" | "underline";

  /**
   * Si la tarjeta tendrá un fondo rellenado.
   */
  filled?: boolean;

  /**
   * Si el radio de la tarjeta será redondeado o recto
   */
  roundedCorners?: boolean;

  /**
   * Estilos personalizados
   */
  className?: string;
}

/**
 * `CardComponent` es un componente de tarjeta reutilizable que se puede personalizar
 * con diferentes tipos de bordes y con un fondo rellenado opcional.
 *
 * ### Ejemplos de uso:
 *
 * ```tsx
 * <CardComponent>
 *   <h2>Card sin borde y sin fondo</h2>
 *   <p>Este es un ejemplo de una tarjeta sin estilos.</p>
 * </CardComponent>
 * <CardComponent border="solid" filled>
 *   <h2>Card con borde sólido y fondo rellenado</h2>
 *   <p>Este es un ejemplo de una tarjeta estilizada.</p>
 * </CardComponent>
 *
 * <CardComponent border="dashed">
 *   <h2>Card con borde discontinuo y sin fondo</h2>
 *   <p>Este es un ejemplo de una tarjeta estilizada.</p>
 * </CardComponent>
 *
 * ```
 */
export const CardComponent: FC<CardComponentProps> = ({
  children,
  border = "none",
  filled = false,
  roundedCorners = true,
  className,
}) => {
  const borderClass =
    border !== "none" ? styles[`border${border.charAt(0).toUpperCase() + border.slice(1)}`] : "";
  const filledClass = filled ? styles.filled : "";
  const roundedClass = roundedCorners ? styles.roundedCorners : "";

  return (
    <div className={`${styles.card} ${borderClass} ${filledClass} ${roundedClass} ${className}`}>
      {children}
    </div>
  );
};
