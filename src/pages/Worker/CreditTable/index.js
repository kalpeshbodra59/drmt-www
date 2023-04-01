import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Common/Button";
import {
  setCreditModalOpen,
  setCreditTableData,
} from "../../../reducers/creditSlice";
import Head from "./head";
import ctx from "classnames";
import styles from "./styles.module.css";
import Label from "../../../components/Common/Label";
import axiosInstance from "../../../api/axios";
import moment from "moment/moment";
import constants from "../../../utilities/constants";
import { statusCodes, toastMessageType } from "../../../utilities/enum";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../utilities/toast";

const CreditTable = () => {
  const { tableData } = useSelector((state) => state.credit);
  const { selectedWorker } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleAddCreditModal = () => {
    dispatch(
      setCreditModalOpen({
        modalOpen: true,
      })
    );
  };

  useEffect(() => {
    if (selectedWorker) {
      async function getAllCredits() {
        const authToken = constants.getAuthTokenFromSessionStorage();
        const result = await axiosInstance.get("/credits", {
          params: {
            workerId: selectedWorker.key,
          },
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (result.data.status === statusCodes.unAuthorized) {
          ToastMessage({
            message: "Session Timeout",
            messageType: toastMessageType.error,
          });
          constants.setAuthTokenInSessionStorage(null);
          navigate("/login");
        } else if (result.data.status === statusCodes.success) {
          dispatch(setCreditTableData(result.data.data[0]));
        }
      }
      getAllCredits();
    }
  }, [selectedWorker, dispatch, navigate]);

  return (
    <div id="creditTable" className="card overflow-x-auto w-100 min-w-50 my-0">
      <div className="card mt-0">
        <div className="text-black font-medium text-base">
          <div className="flex gap-x-1">
            <Label htmlFor="total" text="Total:" />
            <span id="total" className="font-normal">
              {tableData?.total || "0"}
            </span>
          </div>
        </div>
      </div>
      <div
        className={ctx(
          "card py-3 flex justify-center",
          styles.noRecordFoundContainer
        )}
      >
        <Button
          text="Add New"
          className="border border-slate-200 rounded h-9 shadow-sm px-4 bg-white"
          onClick={() => selectedWorker && onHandleAddCreditModal()}
        />
      </div>
      <Head />

      <div className={`card py-6 ${styles.tableContainer}`}>
        {tableData?.allData ? (
          tableData?.allData.map((subRec, index) => {
            return (
              <div
                key={index}
                className={`flex gap-2 py-0 m-0 ${styles.tableBoxRow}`}
              >
                <div className={styles.tableRowRestColumn}>
                  {moment(subRec.date).format("DD-MM-YYYY")}
                </div>
                <div className={styles.tableRowRestColumn}>
                  {subRec.credit ? "Credit" : "Debit"}
                </div>
                <div className={styles.tableRowRestColumn}>{subRec.price}</div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center pb-5">No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default CreditTable;
