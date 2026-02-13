import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/clientActions";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  const { loading, error, user } = useSelector((state) => state.client);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      toast.success("Successfully logged in!");
      history.replace(from);
    }
  }, [user, history, from]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = async (data) => {

    const result = await dispatch(
      loginUser(
        {
          email: data.email,
          password: data.password,
        },
        data.rememberMe
      )
    );

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-semibold text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="rememberMe"
          type="checkbox"
          {...register("rememberMe")}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="rememberMe" className="text-gray-700 text-sm">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`py-3 px-6 rounded-md font-semibold text-white transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-center text-sm text-gray-600">
        <p>Test Accounts (Password: 123456):</p>
        <p className="text-xs mt-1">
          customer@commerce.com | store@commerce.com | admin@commerce.com
        </p>
      </div>
    </form>
  );
}