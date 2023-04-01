import Dropdown from "../../../components/Common/Dropdown";
import { formattedCustomerData } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedWorker,
  setModalOpen,
  setWorkerOptions,
} from "../../../reducers/workerSlice";
import Button from "../../../components/Common/Button";
import { useEffect } from "react";
import axiosInstance from "../../../api/axios";
import constants from "../../../utilities/constants";
import { statusCodes, toastMessageType } from "../../../utilities/enum";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../../utilities/toast";

const TopCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { workerOptions } = useSelector((state) => state.worker);
  useEffect(() => {
    async function fetchData() {
      try {
        const authToken = constants.getAuthTokenFromSessionStorage();
        const result = await axiosInstance.get("/workers", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (result.data.status === statusCodes.unAuthorized) {
          ToastMessage({ message: 'Session Timeout', messageType: toastMessageType.error })
          constants.setAuthTokenInSessionStorage(null);
          navigate('/login');
        } else if (result.data.status === statusCodes.success) {
          const { workers = [] } = formattedCustomerData(result.data.data);
          dispatch(setWorkerOptions(workers));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch, navigate]);

  const onHandleSelection = (option) => {
    dispatch(setSelectedWorker(option));
  };

  const onHandleAddUserModal = () => {
    dispatch(setModalOpen(true));
  };
  return (
    <>
      <div className="flex justify-between">
        <Dropdown
          options={workerOptions}
          placeHolder="Select Worker"
          onHandleSelection={onHandleSelection}
        />
        <Button
          text="Add Worker"
          className="border border-slate-200 rounded h-9 shadow-sm px-4"
          onClick={onHandleAddUserModal}
        />
      </div>
    </>
  );
};

export default TopCard;
