import React, { useState } from "react";
import { Nav, NavItem } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaChevronRight, FaBars } from "react-icons/fa";
import { FaHospitalUser, FaListCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

import { logout } from "../../../store/userSlice";
import LogoutModal from "../../Modal/LogoutModal";
import { AppDispatch, RootState } from "../../../store";

import styles from "./Sidebar.module.scss";

export const Sidebar: React.FC = () => {
  const context = useSelector((state: RootState) => state?.user);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isPatientsActive = location.pathname === "/patients";

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleClose = () => {
    dispatch(logout());
    toggleModal();
    navigate("/login");
  };

  return (
    <>
      <button className={styles.sidebar__toggle} onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebar_open : ""}`}>
        <div className={styles.sidebar__main}>
          <div className={styles.sidebar__brand}>
            <img src="/images/logo.png" alt="logo" className={styles.sidebar__logo} />
          </div>
          <div className={styles.sidebar__profile}>
            <div>{context?.username}</div>
          </div>
        </div>

        <Nav vertical className={styles.sidebar__nav}>
          <NavItem>
            <NavLink
              to="/patients"
              className={isPatientsActive ? styles.sidebar__link__active : styles.sidebar__link}
            >
              <FaHospitalUser
                className={isPatientsActive ? styles.sidebar__icon__active : styles.sidebar__icon}
              />
              <div className={styles.sidebar__icon__label}>
                {t("sidebar.patients")}
                <FaChevronRight
                  className={
                    isPatientsActive ? styles.sidebar__icon__right__active : styles.sidebar__icon__right
                  }
                />
              </div>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/patients/list"
              className={({ isActive }) => (isActive ? styles.sidebar__link__active : styles.sidebar__link)}
            >
              <FaListCheck
                className={
                  location.pathname === "/patients/list" ? styles.sidebar__icon__active : styles.sidebar__icon
                }
              />
              <div className={styles.sidebar__icon__label}>
                {t("sidebar.patientsList")}

                <FaChevronRight
                  className={
                    location.pathname === "/patients/list"
                      ? styles.sidebar__icon__right__active
                      : styles.sidebar__icon__right
                  }
                />
              </div>
            </NavLink>
          </NavItem>
        </Nav>

        <div className={styles.sidebar__footer}>
          <Nav vertical>
            <NavItem>
              <div onClick={toggleModal} className={styles.sidebar__link}>
                <FaSignOutAlt className={styles.sidebar__icon} />
                {t("sidebar.logOut")}
              </div>
            </NavItem>
          </Nav>
        </div>
      </div>
      <LogoutModal isOpen={modalOpen} toggle={toggleModal} handleClose={handleClose} />
    </>
  );
};
