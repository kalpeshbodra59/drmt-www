import Label from "../../../components/Common/Label";

const UserInfomation = ({ data }) => {
  return (
    <div className="card">
      <div className="text-black font-medium text-base">
        {data ? (
          <>
            <div className="flex gap-x-1">
              <Label htmlFor="userName" text="Name:" />
              <span id="userName" className="font-normal">
              {data.text}
              </span>
            </div>
            <div className="flex gap-x-1">
              <Label htmlFor="userAddress" text="Address:" />
              <span id="userAddress" className="font-normal">
              {data.address}
              </span>
            </div>
            <div className="flex gap-x-1">
              <Label htmlFor="mobileNumber" text="Mobile Number:" />
              <span id="mobileNumber" className="font-normal">
              {data.mobileNo}
              </span>
            </div>
          </>
        ) : (
          <div>Please Select Worker</div>
        )}
      </div>
    </div>
  );
};

export default UserInfomation;
