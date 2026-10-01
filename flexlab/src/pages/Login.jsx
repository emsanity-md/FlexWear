import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell, { AuthField, DemoNotice } from "../components/AuthShell";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = (event) => event.preventDefault();

  return (
    <AuthShell
      title="Sign in"
      subtitle="In a production build this is where an account would live, so orders could be tracked against you."
      footer={
        <p className="text-sm text-muted">
          No account yet?{" "}
          <Link
            to="/register"
            className="font-semibold text-iris transition-colors hover:text-iris-deep"
          >
            Create one
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <DemoNotice>
          This form does not submit anywhere. Your email and password stay in
          the page&apos;s memory for as long as it is open, are never sent to a
          server, and are cleared on refresh. Nothing you type here leaves your
          browser.
        </DemoNotice>

        <button type="submit" className="btn btn-primary w-full">
          Sign in
        </button>

        <p className="text-center text-xs leading-relaxed text-muted">
          There is no password reset and no stored session, because there is no
          account system behind this page.
        </p>
      </form>
    </AuthShell>
  );
}