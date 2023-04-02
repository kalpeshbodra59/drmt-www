import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetWorker, setModalOpen } from "../../reducers/workerSlice";
import CreditTable from "./CreditTable";
import TopCard from "./TopCard";
import UserInfomation from "./UserInfomation";
import UserModal from "./UserModal";
import AddCreditModal from "./CreditModal";
import { resetCredit, setCreditModalOpen } from "../../reducers/creditSlice";
import Button from "../../components/Common/Button";

const Worker = () => {
  const { selectedWorker, modalOpen } = useSelector((state) => state.worker);
  const { modalOpen: creditModalOpen } = useSelector((state) => state.credit);
  const dispatch = useDispatch();

  const onHandleReset = () => {
    dispatch(resetWorker());
    dispatch(resetCredit());
  }

  return (
    <>
      <div className="relative z-10">
        <UserModal
          modalOpen={modalOpen}
          setModalOpen={(val) => dispatch(setModalOpen(val))}
        />
        <AddCreditModal
          modalOpen={creditModalOpen}
          setModalOpen={(val) =>
            dispatch(setCreditModalOpen({ modalOpen: val }))
          }
        />
      </div>
      <div className="relative z-1 px-4 py-6 sm:px-0">
        <Button
          text="Reset Selection"
          className="border border-slate-200 rounded h-9 shadow-sm px-4 mb-6"
          onClick={onHandleReset}
        />
        <TopCard />
        <div className="flex flex-col gap-y-4">
          <UserInfomation data={selectedWorker} />
          <CreditTable />
        </div>
      </div>
    </>
  );
};

export default Worker;
