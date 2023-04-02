import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetWorker, setModalOpen } from "../../reducers/workerSlice";
import CreditTable from "./CreditTable";
import TopCard from "./TopCard";
import UserInfomation from "./UserInfomation";
import UserModal from "./UserModal";
import AddCreditModal from "./CreditModal";
import { setCreditModalOpen } from "../../reducers/creditSlice";

const Worker = () => {
  const { selectedWorker, modalOpen } = useSelector((state) => state.worker);
  const { modalOpen: creditModalOpen } = useSelector((state) => state.credit);
  const dispatch = useDispatch();

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
