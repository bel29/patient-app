import React, { useState } from "react";
import { Navbar } from "reactstrap";

import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaFlagUsa, FaUser } from "react-icons/fa";
import { FaFlag } from "react-icons/fa6";
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const context = useSelector((state: RootState) => state.user);
  const [language, setLanguage] = useState("en");
  const { t } = useTranslation();
  const handleLanguageChange = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  return (
    <div className={styles.main__cont}>
      <Navbar className={styles.header} expand="xs">
        <div className={styles.header__title}>{t(title)}</div>
        <div className={styles.header__profile}>
          <div className={styles.profile__div}>
            <FaUser></FaUser>
            <div>{context?.username}</div>
          </div>
          <div onClick={handleLanguageChange} className={styles.language__toggle}>
            {language == "en" ? <FaFlagUsa /> : <FaFlag />}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
