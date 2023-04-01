import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../api/axios";
import { statusCodes, toastMessageType } from "../../../utilities/enum";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../utilities/config";
import ToastMessage from "../../../utilities/toast";
import constants from "../../../utilities/constants";
import { useNavigate } from "react-router-dom";
import { setCreditTableData } from "../../../reducers/creditSlice";

const AddCreditModal = ({ modalOpen = false, setModalOpen = () => {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedWorker } = useSelector((state) => state.worker);

  const formik = useFormik({
    initialValues: {
      date: "",
      price: "",
      credit: "",
    },
    validationSchema: Yup.object({
      date: Yup.string().required("Date is required"),
      price: Yup.number()
        .required("price is required")
        .typeError("Invalid Input"),
      credit: Yup.string().required("Please select Type"),
    }),
    onSubmit: async (values) => {
      // Submit form data to the API
      const { date, price, credit } = values;
      const authToken = constants.getAuthTokenFromSessionStorage();
      const body = {
        date,
        price: credit === "debit" ? -price : price,
        credit: credit === "credit",
        workerId: selectedWorker.key,
      };
      const configs = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      const result = await axiosInstance.post("/credits", body, configs);

      if (result.data.status === statusCodes.unAuthorized) {
        ToastMessage({
          message: "Session Timeout",
          messageType: toastMessageType.error,
        });
        constants.setAuthTokenInSessionStorage(null);
        navigate("/login");
      } else if (
        result.data.status === statusCodes.create ||
        result.data.status === statusCodes.success
      ) {
        ToastMessage({
          message: result.data.message,
          messageType: toastMessageType.success,
        });
        dispatch(setCreditTableData(result.data.data[0]));
      }
      setModalOpen(false);
      formik.resetForm();
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
          <div className="fixed d-flex align-center top-0 left-0 bottom-0 right-0 overflow-y-auto h-50 m-h-50">
            <div className="bg-white p-8 rounded-lg mx-auto mt-16 w-full max-w-sm">
              <h2 className="text-lg font-medium mb-4">Add New Credit</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.date && formik.errors.date
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    max={`${new Date().getFullYear()}-12-31`}
                    min={`${
                      new Date().getFullYear() - config.maxNumberOfYears
                    }-01-01`}
                  />
                  {formik.touched.date && formik.errors.date ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.date}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.price && formik.errors.price
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.price}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <div className="flex gap-4">
                    <label className="flex justify-center items-center gap-2">
                      <input
                        type="radio"
                        name="credit"
                        value="credit"
                        checked={formik.values.credit === "credit"}
                        onChange={formik.handleChange}
                      />
                      Credit
                    </label>
                    <label className="flex justify-center items-center gap-2">
                      <input
                        type="radio"
                        name="credit"
                        value="debit"
                        checked={formik.values.credit === "debit"}
                        onChange={formik.handleChange}
                      />
                      Debit
                    </label>
                  </div>

                  {formik.touched.credit && formik.errors.credit ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.credit}
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

export default AddCreditModal;
