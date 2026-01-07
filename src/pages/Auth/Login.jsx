import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mode from "../../components/Mode";
import { useAuth } from "../../services/application/AuthContext";
import { Input } from "../../components/form";
import { showSuccess, showError } from "../../services/application/toastService";

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = {};

        if (!identifier.trim()) {
            nextErrors.identifier = "Username or email is required.";
        }

        if (!password.trim()) {
            nextErrors.password = "Password is required.";
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) return;

        setIsSubmitting(true);
        
        try {
            const result = await login(identifier, password);
            
            if (result.success) {
                showSuccess("Login successful! Redirecting...");
                // Redirect to dashboard after successful login
                setTimeout(() => {
                    navigate("/dashboard", { replace: true });
                }, 500);
            } else {
                // Rules: Generic error messages (rule 20.10 - Information Leakage)
                const errorMessage = result.error || "Invalid credentials. Please try again.";
                showError(errorMessage);
                setErrors({ 
                    submit: errorMessage
                });
            }
        } catch (error) {
            // Rules: Generic error messages, no stack traces (rule 20.10)
            const errorMessage = error.message || "An error occurred. Please try again.";
            showError(errorMessage);
            setErrors({ 
                submit: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Mode />
            <div
                className="tab-content tab__content__wrapper mb-5 mt-5"
                id="myTabContent"
                data-aos="fade-up"
            >
                <div
                    className="tab-pane fade active show"
                    id="projects__one"
                    role="tabpanel"
                    aria-labelledby="projects__one"
                >
                    <div className="col-xl-4 col-sm-6 offset-sm-4">
                        <div className="loginarea__wraper">
                            <div className="login__heading">
                                <h5 className="login__title">Login</h5>
                            </div>

                            <form onSubmit={handleSubmit} noValidate>
                                <Input
                                    label="Username or email"
                                    name="identifier"
                                    type="text"
                                    placeholder="Your username or email"
                                    value={identifier}
                                    onChange={(event) => setIdentifier(event.target.value)}
                                    error={errors.identifier}
                                    autoComplete="username"
                                    required
                                />

                                <Input
                                    label="Password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    error={errors.password}
                                    autoComplete="current-password"
                                    required
                                />

                                <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                                    <div className="form__check">
                                        <input
                                            id="rememberMe"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(event) => setRememberMe(event.target.checked)}
                                        />
                                        <label htmlFor="rememberMe"> Remember me</label>
                                    </div>
                                    <div className="text-end login__form__link">
                                        <a href="#">Forgot your password?</a>
                                    </div>
                                </div>

                                {errors.submit && (
                                    <div className="login__form">
                                        <p className="form__error" role="alert">
                                            {errors.submit}
                                        </p>
                                    </div>
                                )}

                                <div className="login__button">
                                    <button 
                                        type="submit" 
                                        className="default__button w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Logging in..." : "Log In"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;