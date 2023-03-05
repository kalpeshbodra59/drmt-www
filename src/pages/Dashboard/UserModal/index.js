import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../api/axios";
import { statusCodes, toastMessageType } from "../../../utilities/enum";
import { useDispatch } from "react-redux";
import { formattedCustomerData } from "../utilities";
import { appendNewUserToUserOptions } from "../../../reducers/userSlice";
import constants from "../../../utilities/constants";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../utilities/toast";

const UserModal = ({ modalOpen = false, setModalOpen = () => {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      mobileNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    }),
    onSubmit: async (values) => {
      // Submit form data to the API
      const { name, address, mobileNumber } = values;
      const authToken = constants.getAuthTokenFromSessionStorage();
      const result = await axiosInstance.post(
        "/customers",
        {
          name,
          address,
          mobileNumber,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (result.data.status === statusCodes.unAuthorized) {
        ToastMessage({ message: 'Session Timeout', messageType: toastMessageType.error })
        constants.setAuthTokenInSessionStorage(null);
        navigate('/login');
      } else if (result.status === statusCodes.create) {
        const { customers } = formattedCustomerData([result.data.data]);
        dispatch(appendNewUserToUserOptions(customers[0]));
      }

      setModalOpen(false);
    },
  });

  const closeModal = () => {
    formik.resetForm();
    setModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50">
          <div className="fixed w-full top-0 left-0 bottom-0 right-0 overflow-y-auto h-50 m-h-50">
            <div className="bg-white p-8 rounded-lg mx-auto mt-16 w-full max-w-sm">
              <h2 className="text-lg font-medium mb-4">Add New User</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.address && formik.errors.address
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.address}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mobileNumber"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.mobileNumber}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
                  disabled={!formik.isValid}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModal;
