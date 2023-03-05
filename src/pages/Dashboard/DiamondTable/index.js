import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Common/Button";
import {
  setDiamondModalOpen,
  setDiamondTableData,
} from "../../../reducers/diamondSlice";
import Head from "./head";
import ctx from "classnames";
import styles from "./styles.module.css";
import Label from "../../../components/Common/Label";
import axiosInstance from "../../../api/axios";
import { monthOptions } from "../utilities";
import moment from "moment/moment";
import constants from "../../../utilities/constants";
import { statusCodes, toastMessageType } from "../../../utilities/enum";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../utilities/toast";
import editIcon from "../../../assets/svg/icon-edit.svg";
import deleteIcon from "../../../assets/svg/icon-delete.svg";
import DeleteConfiramtion from "../../../components/Common/Comfirmation";

const DiamondTable = () => {
  const [deleteId, setDeleteId] = useState(null);
  const { selectedMonth, selectedYear, tableData } = useSelector(
    (state) => state.diamond
  );
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleAddDiamondModal = (
    date,
    lotNo,
    totalDiamond,
    totalDiamondWeight,
    workedDiamond,
    workedDiamondWeight,
    id
  ) => {
    dispatch(
      setDiamondModalOpen({
        modalOpen: true,
        date,
        lotNo,
        totalDiamond,
        totalDiamondWeight,
        workedDiamond,
        workedDiamondWeight,
        id,
      })
    );
  };

  useEffect(() => {
    if (selectedUser && selectedYear) {
      async function getAllDiamonds() {
        const month = selectedMonth
          ? monthOptions.find((month) => month.text === selectedMonth)
          : {};
        const authToken = constants.getAuthTokenFromSessionStorage();
        const result = await axiosInstance.get("/diamonds", {
          params: {
            month: month.key,
            year: selectedYear,
            userId: selectedUser.key,
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
          dispatch(setDiamondTableData(result.data.data));
        }
      }
      getAllDiamonds();
    }
  }, [selectedMonth, selectedUser, selectedYear, dispatch, navigate]);

  const handleDelete = async () => {
    const authToken = constants.getAuthTokenFromSessionStorage();
    const month = selectedMonth
      ? monthOptions.find((month) => month.text === selectedMonth)
      : {};
    const result = await axiosInstance.delete("/diamonds", {
      params: {
        id: deleteId,
        userId: selectedUser.key,
        month: month.key,
        year: selectedYear,
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
      ToastMessage({
        message: result.data.message,
        messageType: toastMessageType.success,
      });
      dispatch(setDiamondTableData(result.data.data));
    }
    setDeleteId(null);
  };

  return (
    <div id="diamondTable" className="card overflow-x-auto w-100 min-w-50 my-0">
      <DeleteConfiramtion
        modalOpen={!!deleteId}
        handlePositive={handleDelete}
        handleNegative={() => {
          setDeleteId(null);
        }}
      />
      <div className="card mt-0">
        <div className="text-black font-medium text-base">
          <div className="flex gap-x-1">
            <Label htmlFor="month" text="Month:" />
            <span id="month" className="font-normal">
              {selectedMonth || "Please select month"}
            </span>
          </div>
          <div className="flex gap-x-1">
            <Label htmlFor="year" text="Year:" />
            <span id="year" className="font-normal">
              {selectedYear || "Please select year"}
            </span>
          </div>
        </div>
      </div>
      <Head />
      {tableData.map((rec, index) => {
        return (
          <div
            className={`card pt-6 pb-0 ${styles.tableContainer}`}
            key={index}
          >
            {rec.subData &&
              rec.subData.map((subRec, index) => {
                return (
                  <div
                    key={index}
                    className={`flex gap-2 py-0 m-0 ${styles.tableBoxRow}`}
                  >
                    <div
                      className={
                        index === 0
                          ? styles.tableRowRestColumn
                          : styles.tableRowTwoColumn
                      }
                    >
                      {index === 0 ? moment(rec.date).format("DD-MM-YYYY") : ""}
                    </div>
                    <div
                      className={
                        index === 0
                          ? styles.tableRowRestColumn
                          : styles.tableRowTwoColumn
                      }
                    >
                      {index === 0 ? rec.lNo : ""}
                    </div>
                    <div className={styles.tableRowRestColumn}>
                      {subRec.totalD}
                    </div>
                    <div className={styles.tableRowRestColumn}>
                      {subRec.totalDW}
                    </div>
                    <div className={styles.tableRowRestColumn}>
                      {subRec.workedD}
                    </div>
                    <div className={styles.tableRowRestColumn}>
                      {subRec.workedDW}
                    </div>
                    <div className={styles.tableRowRestColumn}>
                      {subRec.percentage}
                    </div>
                    <div
                      className={ctx(
                        styles.tableRowTwoColumn,
                        "flex justify-center items-center gap-2"
                      )}
                    >
                      <img
                        src={editIcon}
                        className={ctx("w-6", styles.editIcon)}
                        onClick={() =>
                          onHandleAddDiamondModal(
                            moment(rec.date).format("YYYY-MM-DD"),
                            rec.lNo,
                            subRec.totalD,
                            subRec.totalDW,
                            subRec.workedD,
                            subRec.workedDW,
                            subRec.id
                          )
                        }
                        alt="edit"
                      />
                      <img
                        src={deleteIcon}
                        onClick={() => {
                          setDeleteId(subRec.id);
                        }}
                        className={ctx("w-8", styles.deleteIcon)}
                        alt="delete"
                      />
                    </div>
                  </div>
                );
              })}
            <div className={`flex gap-2 py-0 m-0 ${styles.tableBoxRow}`}>
              <div className={styles.tableRowTotalColumn}></div>
              <div className={styles.tableRowTotalColumn}></div>
              <div
                className={ctx(
                  "bg-slate-400 text-white",
                  styles.tableRowTotalColumn,
                  styles.tableRowTotal
                )}
              >
                {rec.total.totalDTotal}
              </div>
              <div className={styles.tableRowTotalColumn}></div>
              <div
                className={ctx(
                  "bg-slate-400 text-white",
                  styles.tableRowTotalColumn,
                  styles.tableRowTotal
                )}
              >
                {rec.total.workedDTotal}
              </div>
              <div className={styles.tableRowTotalColumn}></div>
              <div className={styles.tableRowTotalColumn}></div>
              <div className={styles.tableRowTotalColumn}></div>
            </div>
            <div
              className={ctx(
                "flex justify-end w-100",
                styles.tableBoxRowFooter
              )}
            >
              <Button
                text="Add"
                className="border border-slate-200 rounded h-9 shadow-sm px-4 bg-white"
                onClick={() =>
                  onHandleAddDiamondModal(
                    moment(rec.date).format("YYYY-MM-DD"),
                    rec.lNo
                  )
                }
              />
            </div>
          </div>
        );
      })}
      <div
        className={ctx(
          "card py-3 flex justify-center",
          styles.noRecordFoundContainer
        )}
      >
        <Button
          text="Add New"
          className="border border-slate-200 rounded h-9 shadow-sm px-4 bg-white"
          onClick={() =>
            selectedUser && selectedYear && onHandleAddDiamondModal()
          }
        />
      </div>
    </div>
  );
};

export default DiamondTable;
