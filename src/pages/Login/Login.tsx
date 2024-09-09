import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Col, Row } from "reactstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import { IFormLogin } from "../../types/User";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { RootState, AppDispatch } from "../../store";
import { login } from "../../store/userSlice";
import ActionButton from "../../components/Buttons/Action/ActionButton";

import styles from "./Login.module.scss";

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormLogin>();

  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    try {
      await dispatch(login({ username: data.username, password: data.password })).unwrap();
      navigate("/patients");
    } catch (error) {
      console.error("Login error:", error);

      setError("password", { type: "manual", message: "Invalid credentials" });
    }
  };

  return user.isAuthenticated ? (
    <Navigate to="/patients" />
  ) : (
    <>
      <Row className={styles.wrapper}>
        <Col lg={8}>
          <CardComponent border="none" className={styles.card}>
            <Row className={styles.logo__wrapper}>
              <Col lg={6}>
                <img src="/images/logo.png" alt="Logo" className={styles.logo} />
              </Col>
              <Col lg={6} className={styles.label__welcome}>
                Welcome to <label className={styles.logo__label}>{t("title")}</label>
              </Col>
            </Row>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <h2 className={styles.label}>{t("login.username")}</h2>
              <input
                type="text"
                placeholder={t("login.username")}
                className={styles.input}
                {...register("username", { required: `${t("login.username")} ${t("isRequired")}` })}
              />
              {errors.username && <p className={styles.error}>{errors.username.message}</p>}

              <h2 className={styles.label}>{t("login.password")}</h2>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.password")}
                  className={styles.input}
                  {...register("password", { required: `${t("login.password")} ${t("isRequired")}` })}
                />
                <button
                  type="button"
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}

              <ActionButton
                onClick={handleSubmit(onSubmit)}
                fullWidth={true}
                label={t("login.signIn")}
              ></ActionButton>
            </form>
            <span className={styles.link}>{t("login.forgotPassword")}</span>
            <hr className={styles.hr} />
            <span className={styles.link}>{t("login.register")}</span>
          </CardComponent>
        </Col>
      </Row>
      <ToastContainer />
    </>
  );
};
