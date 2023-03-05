import Button from "../Button";

const DeleteConfiramtion = ({
  modalOpen = false,
  handlePositive = () => {},
  handleNegative = () => {},
  text = "Are you sure you want to delete this record?",
}) => {
  return (
    <>
      {modalOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50">
          <div className="fixed w-full top-0 left-0 bottom-0 right-0 overflow-y-auto h-50 m-h-50">
            <div className="bg-white p-8 rounded-lg mx-auto mt-16 w-full max-w-sm">
              <h2 className="text-lg font-medium mb-4">{text}</h2>
              <div className="flex gap-2">
                <Button
                  text="Yes"
                  className="border border-green-400 rounded h-9 shadow-sm px-4 bg-green-400"
                  onClick={() => handlePositive()}
                />
                <Button
                  text="No"
                  className="border border-red-400 rounded h-9 shadow-sm px-4 bg-red-400"
                  onClick={() => handleNegative()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfiramtion;
