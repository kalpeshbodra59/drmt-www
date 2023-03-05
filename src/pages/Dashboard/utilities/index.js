import { toastMessageType } from "../../../utilities/enum";
import ToastMessage from "../../../utilities/toast";

const userOptions = [
  {
    key: 1,
    text: "Jigar",
    address: "Address 1",
    mobileNo: "7896541230",
  },
  {
    key: 2,
    text: "Abhay",
    address: "Address 2",
    mobileNo: "7896541231",
  },
  {
    key: 3,
    text: "Rutvik",
    address: "Address 3",
    mobileNo: "7896541232",
  },
  {
    key: 4,
    text: "Vivek",
    address: "Address 4",
    mobileNo: "7896541233",
  },
];

const monthOptions = [
  {
    key: 1,
    value: 1,
    text: "January",
  },
  {
    key: 2,
    value: 2,
    text: "February",
  },
  {
    key: 3,
    value: 3,
    text: "March",
  },
  {
    key: 4,
    value: 4,
    text: "April",
  },
  {
    key: 5,
    value: 5,
    text: "May",
  },
  {
    key: 6,
    value: 6,
    text: "June",
  },
  {
    key: 7,
    value: 7,
    text: "July",
  },
  {
    key: 8,
    value: 8,
    text: "August",
  },
  {
    key: 9,
    value: 9,
    text: "September",
  },
  {
    key: 10,
    value: 10,
    text: "October",
  },
  {
    key: 11,
    value: 11,
    text: "November",
  },
  {
    key: 12,
    value: 12,
    text: "December",
  },
];

const generateYearOptions = (year, numberOfYears = 5) => {
  const data = [
    ...Array(numberOfYears)
      .fill(0)
      .map((value, index) => year - (numberOfYears - index)),
    year,
  ];
  return data.map((year, index) => ({
    key: index + 1,
    value: year,
    text: year,
  }));
};

const formattedCustomerData = (data = []) => {
  if (!data.length) return [];
  const customers = data.map(({ _id, name, address, mobileNumber }) => {
    return {
      key: _id,
      text: name,
      address,
      mobileNo: mobileNumber,
    };
  });
  return {
    customers,
  };
};

const errorMessages = ({
  isUserSelected = true,
  isYearSelected = true,
  isTableHaveData = true,
}) => {
  if (!isUserSelected) {
    return ToastMessage({
      message: "Please Select User",
      messageType: toastMessageType.info,
    });
  } else if (!isYearSelected) {
    return ToastMessage({
      message: "Please Select Year",
      messageType: toastMessageType.info,
    });
  } else if (!isTableHaveData) {
    return ToastMessage({
      message: "No Records Found...",
      messageType: toastMessageType.info,
    });
  }
};

const getPDFFormattedData = (tableData) => {
  const pdfData = [];
  tableData.forEach((record) => {
    record.subData.forEach(
      ({ workedDW, workedD, totalDW, totalD, percentage }, index) => {
        pdfData.push({
          ...(index === 0 ? { date: record.date, lNo: record.lNo } : {}),
          totalD,
          totalDW,
          workedD,
          workedDW,
          percentage,
        });
      }
    );
    pdfData.push({
      totalD: record.total.totalDTotal,
      workedD: record.total.workedDTotal,
    })
  });
  return pdfData;
};

export {
  userOptions,
  monthOptions,
  generateYearOptions,
  formattedCustomerData,
  errorMessages,
  getPDFFormattedData,
};
