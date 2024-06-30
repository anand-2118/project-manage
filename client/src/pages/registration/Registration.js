import { useState } from "react";
import bgImage from "../../assets/Art.png";
import styles from "./Registration.module.css";

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatchError, setPasswordMatchError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !email || !password || !confirmPassword) return;
		if (password !== confirmPassword) {
			setPasswordMatchError(true);
			return;
		}
		setPasswordMatchError(false);
		const currentUser = { name, email, password };
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
				<h1>Register</h1>
			</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							name="name"
							placeholder="Name"
							className={styles.input}
							value={name}
							onChange={(e) => setName(e.target.value)}
						/><br/>
						{!name && <label className={styles.label}>Field is required</label>}
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/><br/>
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
						/><br/>
						{!password && <label className={styles.label}>Field is required</label>}
					</div>
					<div className="form-group">
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							className={styles.input}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/><br/>
						{!confirmPassword && <label className={styles.label}>Field is required</label>}
					</div>
					{passwordMatchError && <p className={styles.error}>Passwords do not match</p>}
					
					<button
						className={styles.submit}
						type="submit"
					>
						Register
					</button>
				</form>
				<div className={styles.footer}>
					<p>Have an Account?</p>
				</div>
			</div>
		</div>
	);
};

export default Registration;
