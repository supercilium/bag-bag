import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  EditIndicator,
  FileInputRoot,
  ImagePreview,
  Indicator,
  Placeholder,
  State,
} from "./FileInput.styles";
import Add from "../icons/add.svg";
import Close from "../icons/close.svg";
import Check from "../icons/check-outline.svg";
import Edit from "../icons/edit.svg";
import {
  ChangeEventHandler,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface FileInputProps extends UseFormRegisterReturn {
  photo?: boolean;
  labelText?: ReactNode;
  error?: ReactNode;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ photo, labelText, error, onChange, ...rest }, ref) => {
    const [state, setState] = useState<State>(error ? "error" : "empty");
    const [file, setFile] = useState<File>(null);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        setFile(event.target.files?.[0]);
        onChange(event);
      },
      [onChange]
    );

    useEffect(() => {
      setState((error && "error") || (file ? "success" : "empty"));
    }, [file, error]);

    return (
      <FileInputRoot $state={state}>
        <input {...rest} ref={ref} onChange={handleChange} type="file" />
        {file ? (
          <ImagePreview>
            <img src={URL.createObjectURL(file)} />
          </ImagePreview>
        ) : (
          <Placeholder>
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
  }
);
