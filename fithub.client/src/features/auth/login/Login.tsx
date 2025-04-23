import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const Login: React.FC = () => {
  // Set default test values for easier login testing
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  
  // Reset input fields when component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Login attempt with:', { email, password });
      await login(email, password);
      // No need to navigate, as AuthContext's login function will handle it
    } catch (err: any) {
      console.error('Login component error:', err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 16, 0.92), rgba(0, 0, 16, 0.58)), url("img/pexels-photo-669576.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        className="position-relative py-4 py-xl-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div
            className="row d-flex justify-content-center"
            style={{
              paddingBottom: "0px",
              marginBottom: "55px",
              marginTop: "16px",
            }}
          >
            <div className="col-md-6 col-xl-4">
              <div
                className="card mb-5"
                style={{ background: "var(--bs-body-bg)" }}
              >
                <div
                  className="card-body d-flex flex-column align-items-center"
                  style={{
                    paddingLeft: "0px",
                    marginLeft: "6px",
                    paddingRight: "0px",
                    marginRight: "3px",
                    marginBottom: "7px",
                    marginTop: "4px",
                    paddingBottom: "57px",
                    paddingTop: "30px",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Login</p>
                  <form
                    className="text-center"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        style={{ marginTop: "0px" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary d-block w-100"
                        type="submit"
                        style={{ marginTop: "8px" }}
                      >
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </div>
                    <a href="#">Forgot your password?</a>
                    <p
                      className="text-muted"
                      style={{
                        marginBottom: "-2px",
                        paddingTop: "9px",
                        marginTop: "4px",
                      }}
                    >
                      Don't have an account?
                    </p>
                    <Link to="/register">Sign Up</Link>
                    {error && (
                      <p
                        className="alert alert-danger"
                        style={{ marginTop: "30px" }}
                      >
                        {error}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
