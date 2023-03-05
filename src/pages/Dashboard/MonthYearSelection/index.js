import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Common/Button";
import Dropdown from "../../../components/Common/Dropdown";
import TableDocument from "../../../components/TableForPDF";
import {
  setDiamondTableMonth,
  setDiamondTableYear,
} from "../../../reducers/diamondSlice";
import config from "../../../utilities/config";
import {
  generateYearOptions,
  getPDFFormattedData,
  monthOptions,
} from "../utilities";
import { PDFDownloadLink } from "@react-pdf/renderer";

const MonthYearSeletion = () => {
  const { tableData, selectedYear } = useSelector((state) => state.diamond);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const onHandleMonthSelection = (option) => {
    dispatch(setDiamondTableMonth(option.text));
  };

  const onHandleYearSelection = (option) => {
    dispatch(setDiamondTableYear(option.text));
  };

  const yearOptions = useMemo(
    () => generateYearOptions(currentYear, config.maxNumberOfYears),
    [currentYear]
  );

  const pdfData = useMemo(() => getPDFFormattedData(tableData), [tableData]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex gap-x-4">
        <Dropdown
          options={monthOptions}
          placeHolder="Select Month"
          onHandleSelection={onHandleMonthSelection}
        />
        <Dropdown
          options={yearOptions}
          placeHolder="Select Year"
          onHandleSelection={onHandleYearSelection}
        />
      </div>
      <div>
        {selectedUser && selectedYear && tableData.length ? (
          <PDFDownloadLink
            document={<TableDocument data={pdfData} recordsPerPage={20} />}
            fileName="download.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <Button
                  text="Export as PDF"
                  className="border border-slate-200 rounded h-9 shadow-sm px-4 bg-white"
                />
              )
            }
          </PDFDownloadLink>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default MonthYearSeletion;
