import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (data) => {
    data.roleId = "67c58a3e6146a8c8c5b87dbb";
    try {
      const res = await axios.post("/user", data);
      if (res.status === 201) {
        toast.success("Signup successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Slide,
        });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  const validationSchema = {
    firstname: { required: "First name is required" },
    lastname: { required: "Last name is required" },
    username: { required: "Username is required" },
    email: {
      required: "Email is required",
      pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" },
    },
    phone: {
      required: "Phone number is required",
      pattern: { value: /^[6-9]{1}[0-9]{9}$/, message: "Enter a valid phone number" },
    },
    password: { required: "Password is required" },
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={5000} theme="dark" transition={Slide} />
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#156596", fontFamily: "Poppins, sans-serif" }}>
        <div className="card p-4 shadow-lg" style={{ maxWidth: "600px", width: "100%", transform: "none", borderRadius: "10px", background: "#ffffff" }}>
          <h2 className="text-center mb-3" style={{ color: "#1E8FD5", fontWeight: "bold" }}>Signup</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "bold", color: "#555" }}>First Name</label>
                <input type="text" className="form-control" style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", fontSize: "14px", background: "#f9f9f9" }} placeholder="Enter first name" {...register("Firstname", validationSchema.firstname)} />
                <small className="text-danger" style={{ fontWeight: "bold" }}>{errors.Firstname?.message}</small>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "bold", color: "#555" }}>Last Name</label>
                <input type="text" className="form-control" style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", fontSize: "14px", background: "#f9f9f9" }} placeholder="Enter last name" {...register("Lastname", validationSchema.lastname)} />
                <small className="text-danger" style={{ fontWeight: "bold" }}>{errors.Lastname?.message}</small>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "bold", color: "#555" }}>Username</label>
                <input type="text" className="form-control" style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", fontSize: "14px", background: "#f9f9f9" }} placeholder="Enter username" {...register("Username", validationSchema.username)} />
                <small className="text-danger" style={{ fontWeight: "bold" }}>{errors.Username?.message}</small>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "bold", color: "#555" }}>Email</label>
                <input type="email" className="form-control" style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", fontSize: "14px", background: "#f9f9f9" }} placeholder="Enter email" {...register("email", validationSchema.email)} />
                <small className="text-danger" style={{ fontWeight: "bold" }}>{errors.email?.message}</small>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "bold", color: "#555" }}>Phone Number</label>
                <input type="text" className="form-control" style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", fontSize: "14px", background: "#f9f9f9" }} placeholder="Enter phone number" {...register("Phonenumber", validationSchema.phone)} />
                <small className="text-danger" style={{ fontWeight: "bold" }}>{errors.Phonenumber?.message}</small>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ fontWeight: "bold", color: "#555" }}>Password</label>
                <input type="password" className="form-control" style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", fontSize: "14px", background: "#f9f9f9" }} placeholder="Enter password" {...register("password", validationSchema.password)} />
                <small className="text-danger" style={{ fontWeight: "bold" }}>{errors.password?.message}</small>
              </div>
            </div>
            <div className="mt-3 form-check">
              <input type="checkbox" className="form-check-input" id="terms" required />
              <label className="form-check-label" htmlFor="terms" style={{ color: "#555" }}>Agree to terms and conditions</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3" style={{ background: "#007bff", border: "none", padding: "10px", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Signup</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>Login</a></p>
          </div>
        </div>
      </div>
    </>
  );
};