import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell, { AuthField, DemoNotice } from "../components/AuthShell";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = (event) => event.preventDefault();

  const mismatch =
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  return (
    <AuthShell
      title="Create an account"
      subtitle="Here to show what the account flow would look like. There is nothing behind it."
      footer={
        <p className="text-sm text-muted">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-semibold text-iris transition-colors hover:text-iris-deep"
          >
            Sign in
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
          autoComplete="new-password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <div>
          <AuthField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {mismatch && (
            <p className="mt-2 text-xs text-iris" role="alert">
              Passwords do not match.
            </p>
          )}
        </div>

        <DemoNotice>
          Nothing is created. No account is written, no email is sent, and no
          credentials are stored. Both fields stay in this page&apos;s memory
          until you close or refresh it.
        </DemoNotice>

        <button
          type="submit"
          disabled={mismatch}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          Create account
        </button>
      </form>
    </AuthShell>
  );
}