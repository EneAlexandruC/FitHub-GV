import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { login } from "./LoginSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div
      className="position-relative py-4 py-xl-5"
      style={{ marginTop: "28px" }}
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
                  <div className="mb-3">
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
                  <a href="signup.html">Sign Up</a>
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
  );
};

export default Login;
