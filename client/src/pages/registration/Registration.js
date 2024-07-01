import { useState } from "react";
import bgImage from "../../assets/Art.png";
import { useNavigate } from "react-router-dom";
import{register} from '../services/authServices'

import styles from "./Registration.module.css";

const Registration = () => {
	const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      const navigate = useNavigate();
      const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(data);
        alert(response);
       navigate("/");
      };
      console.log(data);

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
							value={data.name}
							onChange={handleChange}
						/><br/>
						{!data.name && <label className={styles.label}>Field is required</label>}
					</div>
					<div className="form-group">
						<input
							type="email"
							name="email"
							placeholder="Email"
							className={styles.input}
							value={data.email}
							onChange={handleChange}
						/><br/>
						{!data.email && <label className={styles.label}>Field is required</label>}
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							placeholder="Password"
							className={styles.input}
							value={data.password}
							onChange={handleChange}
						/><br/>
						{!data.password && <label className={styles.label}>Field is required</label>}
					</div>
					<div className="form-group">
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							className={styles.input}
							value={data.confirmPassword}
							onChange={handleChange}
						/><br/>
						{!data.confirmPassword && <label className={styles.label}>Field is required</label>}
					</div>
					
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
