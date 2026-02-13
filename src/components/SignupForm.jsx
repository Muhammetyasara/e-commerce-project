import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../store/actions/thunkActions";
import { setUser } from "../store/actions/clientActions";
import api from "../api/axios";

export default function SignupForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.client.roles);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      role_id: "3",
    },
  });

  const roleId = watch("role_id");
  const password = watch("password");

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (roles.length > 0) {
      setValue("role_id", "3");
    }
  }, [roles, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitError("");
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: Number(data.role_id),
      };

      if (Number(data.role_id) === 2) {
        payload.store = {
          name: data.store.name,
          phone: data.store.phone,
          tax_no: data.store.tax_no,
          bank_account: data.store.bank_account,
        };
      }

      const response = await api.post("/signup", payload);
      dispatch(setUser(response.data));
      alert("You need to click link in email to activate your account!");
      history.goBack();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isStoreSelected = Number(roleId) === 2;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-4 rounded-tl-3xl rounded-br-3xl p-12 w-96 flex flex-col gap-3 bg-gray-200 ring-4 ring-sky-500"
    >
      <input
        {...register("name", {
          required: "Name is required",
          minLength: { value: 3, message: "Minimum 3 characters" },
        })}
        placeholder="Name"
        className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
      />
      {errors.name && (
        <span className="text-red-500 text-xs font-medium">
          * {errors.name.message}
        </span>
      )}

      <input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
        })}
        placeholder="Email"
        className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
      />
      {errors.email && (
        <span className="text-red-500 text-xs font-medium">
          * {errors.email.message}
        </span>
      )}

      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
            message: "Min 8 chars incl. upper, lower, number, special",
          },
        })}
        placeholder="Password"
        className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
      />
      {errors.password && (
        <span className="text-red-500 text-xs font-medium">
          * {errors.password.message}
        </span>
      )}

      <input
        type="password"
        {...register("confirm", {
          required: "Please confirm password",
          validate: (v) => v === password || "Passwords do not match",
        })}
        placeholder="Confirm Password"
        className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
      />
      {errors.confirm && (
        <span className="text-red-500 text-xs font-medium">
          * {errors.confirm.message}
        </span>
      )}

      <select
        {...register("role_id", { required: "Please select a role" })}
        className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
      >
        {roles.map((role) => (
          <option key={role.id} value={String(role.id)}>
            {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
          </option>
        ))}
      </select>
      {errors.role_id && (
        <span className="text-red-500 text-xs font-medium">
          * {errors.role_id.message}
        </span>
      )}

      {isStoreSelected && (
        <>
          <input
            {...register("store.name", {
              required: "Store name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
            })}
            placeholder="Store Name"
            className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
          />
          {errors.store?.name && (
            <span className="text-red-500 text-xs font-medium">
              * {errors.store.name.message}
            </span>
          )}

          <input
            {...register("store.phone", {
              required: "Store phone is required",
              pattern: {
                value: /^(\+90|0)?5\d{9}$/,
                message: "Invalid Turkish phone number",
              },
            })}
            placeholder="Store Phone (+905xxxxxxxxx)"
            className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
          />
          {errors.store?.phone && (
            <span className="text-red-500 text-xs font-medium">
              * {errors.store.phone.message}
            </span>
          )}

          <input
            {...register("store.tax_no", {
              required: "Tax ID is required",
              pattern: {
                value: /^T\d{4}V\d{6}$/,
                message: "Format: TXXXXVXXXXXX",
              },
            })}
            placeholder="Tax ID (TXXXXVXXXXXX)"
            className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
          />
          {errors.store?.tax_no && (
            <span className="text-red-500 text-xs font-medium">
              * {errors.store.tax_no.message}
            </span>
          )}

          <input
            {...register("store.bank_account", {
              required: "IBAN is required",
              pattern: {
                value: /^TR\d{24}$/,
                message: "Invalid IBAN (TR + 24 digits)",
              },
            })}
            placeholder="IBAN (TR + 24 digits)"
            className="border-2 p-2 hover:border-stone-400 hover:bg-stone-100"
          />
          {errors.store?.bank_account && (
            <span className="text-red-500 text-xs font-medium">
              * {errors.store.bank_account.message}
            </span>
          )}
        </>
      )}

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

      <button
        type="submit"
        disabled={!isValid || loading}
        className="border-2 p-2 bg-teal-300 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}