import { toast } from "react-toastify";

const success = ({
  text = "Success!",
  position = "top-right",
  autoClose = 3000,
  theme = "light",
}) => {
  toast.success(text, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

const error = ({
  text = "Error!",
  position = "top-right",
  autoClose = 3000,
  theme = "light",
}) => {
  toast.error(text, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

const warning = ({
  text = "Warning!",
  position = "top-right",
  autoClose = 3000,
  theme = "light",
}) => {
  toast.warning(text, {
    position: position,
    autoClose: autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
  });
};

export { success, error, warning };
