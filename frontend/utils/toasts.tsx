import { toast } from "react-toastify";
import Close from "../components/icons/close.svg";
import Check from "../components/icons/check-outline.svg";

export const toastError = (str: string) =>
  toast.error(str, { icon: <Close width="22" height="22" fill="red" /> });

export const toastSuccess = (str: string) =>
  toast.success(str, { icon: <Check width="22" height="22" fill="red" /> });
