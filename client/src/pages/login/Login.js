import React, { useState } from 'react';
import bgImage from "../../assets/Art.png";
import styles from './Login.module.css'; // Ensure this path is correct and the file exists
import {login} from '../services/authServices'
import { useNavigate } from "react-router-dom";


export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
      });
      const navigate = useNavigate();
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        login(data).then((response) => {
          console.log(`Welcome, ${response.data.name}`)
         // alert(`Welcome, ${response.data.name}`);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          navigate("/dashboard", {
            state: {
                userId: response.data.userId || ''
            }
          });
        });
      };

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <img src={bgImage} className={styles.bgImage} alt="Registration" />
            </div>
            <div className={styles.right}>
                <div className={styles.rightHeader}>
                    <h1>Login</h1>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className={styles.input}
                            onChange={handleChange}
                            />
                        <br />
                        {!data.email && <label className={styles.label}>Field is required</label>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={styles.input}
                            onChange={handleChange}
                            />
                        <br />
                        {!data.password && <label className={styles.label}>Field is required</label>}
                    </div>
                    <button
                        className={styles.submit}
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <div className={styles.footer}>
                    <p>Have no Account yet?</p>
                </div>
            </div>
        </div>
    )}