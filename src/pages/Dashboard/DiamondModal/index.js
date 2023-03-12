import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../api/axios";
import { getPercentage } from "../../../utilities/calculations";
import { statusCodes, toastMessageType } from "../../../utilities/enum";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../utilities/config";
import { monthOptions } from "../utilities";
import ToastMessage from "../../../utilities/toast";
import { setDiamondTableData } from "../../../reducers/diamondSlice";
import constants from "../../../utilities/constants";
import { useNavigate } from "react-router-dom";

const AddDiamondModal = ({
  modalOpen = false,
  date = "",
  lotNo = "",
  setModalOpen = () => {},
  totalDiamond = "",
  totalDiamondWeight = "",
  workedDiamond = "",
  workedDiamondWeight = "",
  id = "",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { selectedMonth, selectedYear } = useSelector((state) => state.diamond);

  const formik = useFormik({
    initialValues: {
      date: date || "",
      lotNo: lotNo || "",
      totalDiamond: totalDiamond || "",
      totalDiamondWeight: totalDiamondWeight || "",
      workedDiamond: workedDiamond || "",
      workedDiamondWeight: workedDiamondWeight || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      date: Yup.string().required("Date is required"),
      lotNo: Yup.string()
        .required("lotNo is required"),
      totalDiamond: Yup.number()
        .required("Total Diamond is required")
        .typeError("Invalid Input"),
      totalDiamondWeight: Yup.number()
        .required("Total Diamond Weight is required")
        .typeError("Invalid decimal format"),
      workedDiamond: Yup.number()
        .required("Worked Diamond is required")
        .typeError("Invalid Input"),
      workedDiamondWeight: Yup.number()
        .required("Worked Diamond Weight is required")
        .typeError("Invalid decimal format"),
    }),
    onSubmit: async (values) => {
      // Submit form data to the API
      const {
        date,
        lotNo,
        totalDiamond,
        totalDiamondWeight,
        workedDiamond,
        workedDiamondWeight,
      } = values;
      const month = selectedMonth
        ? monthOptions.find((month) => month.text === selectedMonth)
        : {};
      const authToken = constants.getAuthTokenFromSessionStorage();
      const body = {
        date,
        lot_no: lotNo,
        total_diamond: totalDiamond,
        total_diamond_weight: totalDiamondWeight,
        worked_diamond: workedDiamond,
        worked_diamond_weight: workedDiamondWeight,
        percentage: getPercentage(workedDiamondWeight, totalDiamondWeight),
        userId: selectedUser.key,
        month: month.key,
        year: selectedYear,
      };
      const configs = {
        headers: { Authorization: `Bearer ${authToken}` },
        ...(id ? { params: { id } } : {}),
      };

      let result = {};

      if (id) {
        result = await axiosInstance.put("/diamonds", body, configs);
      } else {
        result = await axiosInstance.post("/diamonds", body, configs);
      }

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
        dispatch(setDiamondTableData(result.data.data));
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
              <h2 className="text-lg font-medium mb-4">
                Add New Diamond Record
              </h2>
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
                    disabled={!id && !!date}
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.date && formik.errors.date
                        ? "border-red-500"
                        : ""
                    } ${!id && !!lotNo ? "bg-slate-200" : ""}`}
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
                    htmlFor="lotNo"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Lot No
                  </label>
                  <input
                    id="lotNo"
                    name="lotNo"
                    type="text"
                    disabled={!id && !!lotNo}
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.lotNo && formik.errors.lotNo
                        ? "border-red-500"
                        : ""
                    } ${!id && !!lotNo ? "bg-slate-200" : ""}`}
                    value={formik.values.lotNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lotNo && formik.errors.lotNo ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.lotNo}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="totalDiamond"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Total Diamond
                  </label>
                  <input
                    id="totalDiamond"
                    name="totalDiamond"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.totalDiamond && formik.errors.totalDiamond
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.totalDiamond}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.totalDiamond && formik.errors.totalDiamond ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.totalDiamond}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="totalDiamondWeight"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Total Diamond Weight
                  </label>
                  <input
                    id="totalDiamondWeight"
                    name="totalDiamondWeight"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.totalDiamondWeight &&
                      formik.errors.totalDiamondWeight
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.totalDiamondWeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.totalDiamondWeight &&
                  formik.errors.totalDiamondWeight ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.totalDiamondWeight}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="workedDiamond"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Worked Diamond
                  </label>
                  <input
                    id="workedDiamond"
                    name="workedDiamond"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.workedDiamond &&
                      formik.errors.workedDiamond
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.workedDiamond}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.workedDiamond &&
                  formik.errors.workedDiamond ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.workedDiamond}
                    </p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="workedDiamondWeight"
                    className="block font-bold mb-2 text-gray-700"
                  >
                    Worked Diamond Weight
                  </label>
                  <input
                    id="workedDiamondWeight"
                    name="workedDiamondWeight"
                    type="text"
                    className={`w-full p-2 border border-gray-400 ${
                      formik.touched.workedDiamondWeight &&
                      formik.errors.workedDiamondWeight
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values.workedDiamondWeight}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.workedDiamondWeight &&
                  formik.errors.workedDiamondWeight ? (
                    <p className="text-red-500 text-xs italic mt-2">
                      {formik.errors.workedDiamondWeight}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full"
                  disabled={!formik.isValid}
                >
                  {id ? "Edit" : "Submit"}
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

export default AddDiamondModal;
