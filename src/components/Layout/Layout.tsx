import { FC, ReactNode } from "react";
import { Sidebar } from "./Sidebar/Sidebar";
import { Header } from "./Header/Header";
import { useSelector } from "react-redux";
import { selectUserContext } from "../../store/selectors";
import { Navigate } from "react-router-dom";

interface LayoutProps {
  /**
   * El título que se mostrará en el `Header`.
   */
  children: ReactNode;

  /**
   * El contenido principal que se renderizará dentro del layout, entre el `Sidebar` y el `Footer`.
   */
  title: string;
}

/**
 * `Layout` es un componente de orden superior (HOC) que se utiliza para envolver todas las rutas principales de la aplicación.
 *
 * Este componente garantiza que todas las páginas de la aplicación mantengan una estructura consistente, incluyendo un header,
 * un sidebar, y un footer. El contenido de cada página se renderiza dentro del marco proporcionado por este layout.
 *
 * ### Propósito
 *
 * - El `Header` muestra el título de la página, que se pasa como prop `title`.
 * - El `Sidebar` proporciona navegación lateral para moverse entre diferentes secciones de la aplicación.
 * - El `Footer` se muestra en la parte inferior de todas las páginas.
 *
 * ### Ejemplo de Uso
 *
 * ```tsx
 * <Layout title="Página de Inicio">
 *   <Home />
 * </Layout>
 * ```
 *
 * En este ejemplo, el componente `Home` se renderizará dentro del `Layout`, mostrando el título "Página de Inicio" en el `Header`,
 * con un `Sidebar` a la izquierda y un `Footer` en la parte inferior de la página.
 *
 * @param {LayoutProps} props - Las propiedades que configuran el componente `Layout`.
 * @returns {JSX.Element} Un elemento JSX que representa el layout con el header, sidebar, contenido principal, y footer.
 */
export const Layout: FC<LayoutProps> = ({ title, children }) => {
  const user = useSelector(selectUserContext);

  return user.isAuthenticated ? (
    <>
      <Sidebar />
      <Header title={title} />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};
