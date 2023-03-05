import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import DiamondOutline from "../../assets/svg/diamond-outline-black.svg";
import { statusCodes, toastMessageType } from "../../utilities/enum";
import ToastMessage from "../../utilities/toast";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import constants from "../../utilities/constants";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async ({ userName, password }) => {
    setLoading(true);
    // Handle login logic here

    const result = await axiosInstance.post("/login", {
      userName: userName,
      password: password,
    });

    if (result.data.status === statusCodes.failed) {
      ToastMessage({
        message: result.data.message,
        messageType: toastMessageType.error,
      });
    } else if (result.data.status === statusCodes.success) {
      constants.setAuthTokenInSessionStorage(result.data.token);
      navigate('/');
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
            <div>
              <img
                src={DiamondOutline}
                alt="diamond"
                className="mx-auto h-12 w-auto"
              />
              <h2 className="text-2xl mb-4 text-center">Login</h2>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="userName"
              >
                Username
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.userName && touched.userName && "border-red-500"
                }`}
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter your User Name"
              />
              <ErrorMessage
                className="text-red-500 text-xs italic"
                name="userName"
                component="div"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && touched.password && "border-red-500"
                }`}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                className="text-red-500 text-xs italic"
                name="password"
                component="div"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading && "opacity-50 cursor-wait"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
