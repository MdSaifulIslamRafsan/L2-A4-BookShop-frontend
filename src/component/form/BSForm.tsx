import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
  } from "react-hook-form";
  import { ReactNode } from "react";
  import { Form } from "antd";
  type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
  };
  type TBSForm = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
  } & TFormConfig;
  
  const BSForm = ({ onSubmit, children, defaultValues , resolver }: TBSForm) => {
    const formConfig: TFormConfig = {};
    if (defaultValues) {
      formConfig["defaultValues"] = defaultValues;
    }
    if (resolver) {
      formConfig["resolver"] = resolver;
    }
  
    const methods = useForm(formConfig);
  
    return (
      <FormProvider {...methods}>
        <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>{children}</Form>
      </FormProvider>
    );
  };
  
  export default BSForm;