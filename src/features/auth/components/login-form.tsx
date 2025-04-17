import React, { useState } from "react";
import { login } from "../../../services/authService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useAuth } from "../../../lib/auth";
import { paths } from "../../../config/paths";

const LoginForm = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      loginUser(user);
      navigate(paths.app.root.getHref());
    } catch (error) {
      Swal.fire("Error", String(error), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-warning shadow-sm rounded-pill w-100"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
