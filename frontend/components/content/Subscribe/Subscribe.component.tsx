import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  VALIDATION_EMAIL_FORMAT,
  VALIDATION_REQUIRED,
} from "../../../constants/errorMessages";
import { REGEXP_EMAIL } from "../../../constants/regex";
import { createSubscriber, SubscriberInterface } from "../../../utils/api";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { SubscribeBlock } from "./Subscribe.styles";
import { toastError, toastSuccess } from "../../../utils/toasts";

export const Subscribe: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubscriberInterface>({
    shouldFocusError: false,
  });
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const { email } = watch();

  const onSubmit: SubmitHandler<SubscriberInterface> = async (values) => {
    try {
      const res = await createSubscriber(values);
      if ("subscribe" in res) {
        setSubmitMessage(res.subscribe);
        toastSuccess(res.subscribe);
      } else if ("message" in res) {
        setSubmitError(res?.message);
        toastError(res?.message);
      }
    } catch (err) {
      toastError(err?.message);
      setSubmitError(err.message);
    }
  };

  useEffect(() => {
    if (submitError) {
      setSubmitError("");
    }
    if (submitMessage) {
      setSubmitMessage("");
    }
  }, [email]);

  return (
    <SubscribeBlock onSubmit={handleSubmit(onSubmit)}>
      <h2 className="h4">подпишитесь, чтобы не пропустить выгодные акции</h2>
      <div>
        <Input
          {...register("email", {
            required: VALIDATION_REQUIRED,
            pattern: {
              value: REGEXP_EMAIL,
              message: VALIDATION_EMAIL_FORMAT,
            },
          })}
          error={errors?.email?.message || submitError}
        />
        <Button type="submit">подписаться</Button>
      </div>
      <span>{submitMessage}</span>
    </SubscribeBlock>
  );
};
