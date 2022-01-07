import {
  EditIndicator,
  FileInputRoot,
  Indicator,
  Placeholder,
  State,
} from "./FileInput.styles";
import Add from "../icons/add.svg";
import Close from "../icons/close.svg";
import Check from "../icons/check-outline.svg";
import Edit from "../icons/edit.svg";
import { ReactNode, useCallback, useRef, useState } from "react";

export interface FileInputProps {
  photo?: boolean;
  labelText?: ReactNode;
}

export const FileInput: React.FC<FileInputProps> = ({ photo, labelText }) => {
  const [state, setState] = useState<State>("empty");
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = useCallback(() => {
    if (inputRef?.current?.click) {
      inputRef?.current?.click();
    }
  }, [inputRef?.current]);

  return (
    <FileInputRoot $state={state}>
      {photo ? (
        <div></div>
      ) : (
        <Placeholder role="button" onClick={handleClick}>
          <input ref={inputRef} type="file" />
          <Add height="36" width="36" />
        </Placeholder>
      )}
      {labelText && <label>{labelText}</label>}
      {state !== "empty" && (
        <Indicator $state={state}>
          {state === "error" && <Close width="16" height="16" />}
          {state === "success" && <Check width="16" height="16" />}
        </Indicator>
      )}
      <EditIndicator>
        <Edit width="16" height="16" />
      </EditIndicator>
    </FileInputRoot>
  );
};
