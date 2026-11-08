import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ShieldCheck,
    Sparkles,
    UserRound,
    Home
} from "lucide-react";

import logo from "../assets/Skill D Nest.jpeg";
import api from "../services/api";
import "./CustomerLogin.css";

function CustomerLogin() {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                identifier,
                password
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
            }
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            }

            navigate("/customer-dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            const serverMessage = err.response?.data?.message;
            if (serverMessage) {
                setError(serverMessage);
            } else if (err.code === "ERR_NETWORK") {
                setError("Unable to connect to the backend server. Please verify the API URL.");
            } else {
                setError("Invalid email/phone or password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="customer-login-page">

            {/* LEFT VISUAL */}
            <div className="customer-login-visual">

                <div className="customer-bg-image"></div>
                <div className="customer-bg-overlay"></div>

                <button
                    className="customer-home-btn"
                    onClick={() => navigate("/")}
                >
                    <Home size={17} />
                    Home
                </button>

                <div className="customer-visual-content">

                    <div className="customer-badge">
                        <ShieldCheck size={17} />
                        Verified Local Services
                    </div>

                    <h1>
                        Trusted services,
                        <br />
                        <span>right around you.</span>
                    </h1>

                    <p>
                        Find skilled local workers, compare cooperative
                        prices and book reliable services with SkillDnest.
                    </p>

                    <div className="customer-points">
                        <div>
                            <span>✓</span>
                            Verified Workers
                        </div>

                        <div>
                            <span>✓</span>
                            Fair & Transparent Pricing
                        </div>

                        <div>
                            <span>✓</span>
                            Easy Service Booking
                        </div>
                    </div>

                </div>

            </div>


            {/* RIGHT LOGIN */}
            <div className="customer-login-area">

                <div className="customer-login-card">

                    <div className="customer-brand">
                        <img src={logo} alt="SkillDnest Logo" />

                        <div>
                            <h2>SkillDnest</h2>
                            <p>Local Skills, Trusted Services</p>
                        </div>
                    </div>

                    <div className="customer-heading">

                        <div className="customer-icon">
                            <UserRound size={23} />
                        </div>

                        <div>
                            <span>WELCOME BACK</span>
                            <h2>Customer Login</h2>
                        </div>

                    </div>

                    <p className="customer-description">
                        Login to discover trusted services near you.
                    </p>


                    {error && (
                        <div style={{ color: "#ef4444", marginBottom: "1rem", fontSize: "0.9rem", padding: "0.5rem", background: "#fef2f2", borderRadius: "6px" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        <div className="input-group">
                            <label>Email or Phone</label>

                            <input
                                type="text"
                                placeholder="Enter your email or phone"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                            />
                        </div>


                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>


                        <div className="login-options">
                            <label>
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <span>Forgot password?</span>
                        </div>


                        <button
                            type="submit"
                            className="customer-login-btn"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login as Customer"}
                            <ArrowRight size={19} />
                        </button>

                    </form>


                    <div className="divider">
                        <span>OR</span>
                    </div>


                    <div className="create-account-box">

                        <div>
                            <strong>New to SkillDnest?</strong>
                            <p>Create your customer account</p>
                        </div>

                        <button
                            onClick={() => navigate("/customer-register")}
                        >
                            Create Account
                        </button>

                    </div>


                    <div className="customer-security">
                        <ShieldCheck size={17} />
                        Your account information is securely protected.
                    </div>

                </div>

            </div>


            {/* ANIMATION ELEMENT */}
            <div className="floating-sparkle sparkle-one">
                <Sparkles size={20} />
            </div>

            <div className="floating-sparkle sparkle-two">
                <Sparkles size={15} />
            </div>

        </div>
    );
}

export default CustomerLogin;