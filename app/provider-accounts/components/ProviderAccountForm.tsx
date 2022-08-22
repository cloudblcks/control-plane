import { Form, FormProps } from "app/core/components/Form";
import LabeledSelectField, { LabeledSelectOption } from "app/core/components/LabeledSelect";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Field } from "react-final-form";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export interface ProviderAccountFormProps {
  options: Array<LabeledSelectOption>
}

export function ProviderAccountForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & ProviderAccountFormProps
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledSelectField name="provider_id" label="Provider" options={props.options} />
      <LabeledTextField name="credentials" label="CredentialsJson" placeholder="{}" />

    </Form>
  );
}
