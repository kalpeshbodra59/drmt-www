import UserInfomation from "./UserInfomation";
import TopCard from "./TopCard";
import { useDispatch, useSelector } from "react-redux";
import MonthYearSeletion from "./MonthYearSelection";
import DiamondTable from "./DiamondTable";
import { resetUser, setModalOpen } from "../../reducers/userSlice";
import UserModal from "./UserModal";
import AddDiamondModal from "./DiamondModal";
import { setDiamondModalOpen } from "../../reducers/diamondSlice";

export default function Dashboard() {
  const { selectedUser, modalOpen } = useSelector((state) => state.user);
  const {
    modalOpen: diamondModalOpen,
    date: diamondDate,
    lotNo: diamondLotNo,
    totalDiamond,
    totalDiamondWeight,
    workedDiamond,
    workedDiamondWeight,
    id,
  } = useSelector((state) => state.diamond);
  const dispatch = useDispatch();

  return (
    <>
      <div className="relative z-10">
        <UserModal
          modalOpen={modalOpen}
          setModalOpen={(val) => dispatch(setModalOpen(val))}
        />
        <AddDiamondModal
          modalOpen={diamondModalOpen}
          date={diamondDate}
          lotNo={diamondLotNo}
          totalDiamond={totalDiamond}
          totalDiamondWeight={totalDiamondWeight}
          workedDiamond={workedDiamond}
          workedDiamondWeight={workedDiamondWeight}
          id={id}
          setModalOpen={(val) =>
            dispatch(setDiamondModalOpen({ modalOpen: val }))
          }
        />
      </div>
      <div className="relative z-1 px-4 py-6 sm:px-0">
        <TopCard />
        <div className="flex flex-col gap-y-4">
          <UserInfomation data={selectedUser} />
          <MonthYearSeletion />
          <DiamondTable />
        </div>
      </div>
    </>
  );
}
