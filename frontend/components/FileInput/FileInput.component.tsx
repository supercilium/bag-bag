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
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import NextImage from "../Image";

export interface FileInputProps {
  photo?: boolean;
  labelText?: ReactNode;
}

export const FileInput: React.FC<FileInputProps> = ({ photo, labelText }) => {
  const [state, setState] = useState<State>("empty");
  const inputRef = useRef<HTMLInputElement>();
  const [files, setFiles] = useState(null);

  const handleClick = useCallback(() => {
    if (inputRef?.current?.click) {
      inputRef?.current?.click();
    }
  }, [inputRef?.current]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => {
      setFiles(target.files);
      console.log(target.files);
    },
    []
  );

  useEffect(() => {
    setState(files?.[0] ? "success" : "empty");
  }, [files]);

  return (
    <FileInputRoot role="button" onClick={handleClick} $state={state}>
      <input onChange={handleChange} ref={inputRef} type="file" />
      {files?.length ? (
        <ImagePreview>
          <img src={URL.createObjectURL(files[0])} />
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
};
