import { toast } from "react-toastify";
import { toastMessageType } from "./enum";

const ToastMessage = ({
  message,
  messageType,
  autoClose = 2000,
  position = "top-right",
}) => {
  if (messageType === toastMessageType.success) {
    toast.success(message, {
      position: position,
      autoClose: autoClose,
    });
  } else if (messageType === toastMessageType.error) {
    toast.error(message, {
      position: position,
      autoClose: autoClose,
    });
  } else if (messageType === toastMessageType.info) {
    toast.info(message, {
      position: position,
      autoClose: autoClose,
    });
  }
};

export default ToastMessage;
