import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { register, noMatchingPassword } from "./RegisterSlice";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.register
  );

  useEffect(() => {
    // Resetăm starea când componenta este montată
    dispatch({ type: 'register/resetState' });
  }, [dispatch]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(noMatchingPassword());
      return;
    }

    dispatch(
      register({
        firstName,
        lastName,
        email,
        password,
        weight: Number(weight),
        height: Number(height),
        dateOfBirth,
      })
    );
  };

  useEffect(() => {
    if (success) {
      // Redirectăm către login după înregistrare reușită
      navigate("/login");
    }
  }, [success, navigate]);

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
      <section className="position-relative py-4 py-xl-5">
        <div
          className="row mb-5"
          style={{
            background: "rgba(0,0,0,0)",
            borderBottomWidth: "3.4px",
            borderBottomColor: "var(--bs-secondary-color)",
            marginBottom: "26px",
            paddingBottom: "0px",
            marginRight: "0px",
          }}
        >
          <div
            className="col-md-8 col-xl-6 text-center mx-auto"
            style={{
              background: "rgba(255,255,255,0)",
              color: "var(--bs-body-bg)",
            }}
          >
            <h2>
              <strong>Sign Up</strong>
            </h2>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="alert alert-success" role="alert">
                Registration successful! Redirecting to login...
              </div>
            )}
            <p className="w-lg-50" style={{ fontSize: "18px" }}>
              <strong>Start your journey with us!</strong>
            </p>
          </div>
        </div>
        <div
          className="container"
          style={{
            textAlign: "justify",
            paddingTop: "0px",
            marginTop: "-50px",
          }}
        >
          <div
            className="row d-flex justify-content-center"
            style={{
              paddingBottom: "4px",
              marginBottom: "35px",
              marginTop: "-1px",
              paddingTop: "39px",
            }}
          >
            <div className="col-md-6 col-lg-7 col-xl-4">
              <div className="card mb-5" style={{ paddingLeft: "0px" }}>
                <div
                  className="card-body d-flex flex-column align-items-center"
                  style={{
                    marginBottom: "-1px",
                    paddingBottom: "7px",
                    paddingTop: "0px",
                    marginTop: "13px",
                  }}
                >
                  <p>Create your account</p>
                  <form
                    className="text-center"
                    onSubmit={handleSubmit}
                    style={{
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingBottom: "20px",
                      width: "100%",
                      maxWidth: "400px",
                      margin: "0 auto",
                    }}
                  >
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="text"
                        name="weight"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="text"
                        name="height"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        required
                        className="form-control"
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary d-block w-100"
                        type="submit"
                        style={{ marginTop: "0px" }}
                        disabled={loading}
                      >
                        {loading ? "Creating account..." : "Sign Up"}
                      </button>
                    </div>
                    <div className="mb-3">
                      <p className="text-muted">
                        Already have an account?{" "}
                        <Link to="/login">
                          <strong>Login</strong>
                        </Link>
                      </p>
                    </div>
                    {error && (
                      <div
                        className="alert alert-danger"
                        style={{ marginTop: "20px" }}
                      >
                        {error}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
