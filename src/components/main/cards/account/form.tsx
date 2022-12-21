import { Message, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface IForm {
  userAgent: string;
  accountName: string;
  tags: string[];
  withCookies: boolean;
}

const formLogic = () => {
  const { t } = useTranslation();
  const form = useForm<IForm>({
    defaultValues: {
      userAgent: "",
      accountName: "",
      tags: [],
      withCookies: true,
    },
  });

  const registeredUserAgent = form.register("userAgent", {
    required: t("validation.required", {
      field: "user-agent",
    }) as Message,
  });

  const registeredAccountName = form.register("accountName", {
    required: t("validation.required", {
      field: "user-agent",
    }) as Message,
  });

  const onSubmit = (form: IForm) => {
    console.log(form);
  };

  return {
    registeredUserAgent,
    registeredAccountName,
    control: form.control,
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    onSubmit,
  };
};

export default formLogic;
