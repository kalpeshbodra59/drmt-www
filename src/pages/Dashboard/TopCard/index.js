import Dropdown from "../../../components/Common/Dropdown";
import { formattedCustomerData } from "../utilities";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedUser,
  setModalOpen,
  setUserOptions,
} from "../../../reducers/userSlice";
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
  const { userOptions } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchData() {
      try {
        const authToken = constants.getAuthTokenFromSessionStorage();
        const result = await axiosInstance.get("/customers", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (result.data.status === statusCodes.unAuthorized) {
          ToastMessage({ message: 'Session Timeout', messageType: toastMessageType.error })
          constants.setAuthTokenInSessionStorage(null);
          navigate('/login');
        } else if (result.data.status === statusCodes.success) {
          const { customers = [] } = formattedCustomerData(result.data.data);
          dispatch(setUserOptions(customers));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch, navigate]);

  const onHandleSelection = (option) => {
    dispatch(setSelectedUser(option));
  };

  const onHandleAddUserModal = () => {
    dispatch(setModalOpen(true));
  };
  return (
    <>
      <div className="flex justify-between">
        <Dropdown
          options={userOptions}
          placeHolder="Select User"
          onHandleSelection={onHandleSelection}
        />
        <Button
          text="Add User"
          className="border border-slate-200 rounded h-9 shadow-sm px-4"
          onClick={onHandleAddUserModal}
        />
      </div>
    </>
  );
};

export default TopCard;
