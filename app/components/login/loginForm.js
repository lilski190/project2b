"use client";

import { Toaster } from "react-hot-toast";
import { loginAction } from "@/app/actions/authAction";

export default function LoginForm({ dict }) {
  return (
    <>
      <Toaster position="top-center" />
      <form action={loginAction} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-neutral mt-4">
            {dict.login.login}
          </button>
        </fieldset>
      </form>
    </>
  );
}
