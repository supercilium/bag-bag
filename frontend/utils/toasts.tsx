import { toast } from "react-toastify";

export const toastError = (str: string) => toast.error(str);

export const toastSuccess = (str: string) => toast.success(str);
