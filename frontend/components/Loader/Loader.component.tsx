import { Backdrop } from "./Loader.styles";
import LoaderIcon from "../icons/loader.svg";

export const Loader: React.FC = () => {
  return (
    <Backdrop>
      <LoaderIcon />
    </Backdrop>
  );
};
