import React, { useState } from 'react';
import bgImage from "../../assets/Art.png";
import styles from './Login.module.css'; // Ensure this path is correct and the file exists

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) return;

        const currentUser = { email, password };
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(JSON.parse(localStorage.getItem("currentUser")));
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        {!email && <label className={styles.label}>Field is required</label>}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        {!password && <label className={styles.label}>Field is required</label>}
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
    );
}
