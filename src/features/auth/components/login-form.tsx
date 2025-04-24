import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { paths } from "../../../config/paths";
import { loginInputSchema, useLogin } from "../../../lib/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "" });
  const login = useLogin({
    onSuccess: () => {
      navigate(paths.app.root.getHref());
    },
    onError: (error: unknown) => {
      Swal.fire("Error", String(error), "error");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = loginInputSchema.safeParse(form);

    if (!parsed.success) {
      Swal.fire("Error", "Introduce un email válido", "error");
      return;
    }

    login.mutate(form);
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
        disabled={login.isPending}
      >
        {login.isPending ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default LoginForm;
