import { useState } from "react";
import "./App.css";

/* Email: alphanumeric@domain.tld */
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  /* Password rules (derived) */
  const startsWithCapital = /^[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const hasMinLength = password.length >= 5;

  const isPasswordValid =
    startsWithCapital && hasNumber && hasSpecialChar && hasMinLength;

  const isEmailValid = EMAIL_REGEX.test(email);

  /* 🔐 STRONG Password Generator (Guaranteed valid) */
  const generatePassword = () => {
    const capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowers = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specials = "@$!%*?&";

    // Must start with capital
    let pwd = capitals[Math.floor(Math.random() * capitals.length)];

    // Ensure required characters
    pwd += numbers[Math.floor(Math.random() * numbers.length)];
    pwd += specials[Math.floor(Math.random() * specials.length)];
    pwd += lowers[Math.floor(Math.random() * lowers.length)];
    pwd += lowers[Math.floor(Math.random() * lowers.length)];

    // Shuffle remaining characters except first
    const firstChar = pwd[0];
    const rest = pwd
      .slice(1)
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(firstChar + rest);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      setSuccess("Login Successful ✅");
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setSuccess("");
  };

  return (
    <div className="page">
      <div className="container">
        <h2>Login Form</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="row">
            <label>Email ID</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@domain.com"
            />
            {email && !isEmailValid && (
              <p className="error">
                Email must be <b>alphanumeric@domain.tld</b>
              </p>
            )}
          </div>

          {/* Password */}
          <div className="row">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
                title="Show / Hide Password"
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>

            {/* Generator */}
            <div className="generator-box">
              <button
                type="button"
                className="generate-btn"
                onClick={generatePassword}
              >
                🔐 Generate Strong Password
              </button>
            </div>

            {/* Password rules checklist */}
            <ul className="password-rules">
              <li className={startsWithCapital ? "valid" : "invalid"}>
                {startsWithCapital ? "✔" : "✖"} Starts with capital letter
              </li>
              <li className={hasNumber ? "valid" : "invalid"}>
                {hasNumber ? "✔" : "✖"} Contains a number
              </li>
              <li className={hasSpecialChar ? "valid" : "invalid"}>
                {hasSpecialChar ? "✔" : "✖"} Contains special character
              </li>
              <li className={hasMinLength ? "valid" : "invalid"}>
                {hasMinLength ? "✔" : "✖"} Minimum 5 characters
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button
              type="submit"
              disabled={!(isEmailValid && isPasswordValid)}
            >
              Submit
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}

export default App;