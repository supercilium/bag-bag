import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createSubscriber, SubscriberInterface } from "../../../utils/api";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { SubscribeBlock } from "./Subscribe.styles";

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
      if (typeof res === "string") {
        setSubmitMessage(res);
      } else if ("message" in res) {
        setSubmitError(res?.message);
      }
    } catch (err) {
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
      <div>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          error={errors?.email?.message || submitError}
          placeholder="введите email для подписки НА выгодные акции"
        />
        <Button type="submit">подписаться</Button>
      </div>
      <span>{submitMessage}</span>
    </SubscribeBlock>
  );
};
