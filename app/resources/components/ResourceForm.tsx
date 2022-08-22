import { Form, FormProps } from "app/core/components/Form";
import LabeledSelectField, { LabeledSelectOption } from "app/core/components/LabeledSelect";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export interface ResourceFormProps {
  options: Array<LabeledSelectOption>
}

export function ResourceForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & ResourceFormProps
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledSelectField name="provider_account_id" label="Account" options={props.options} />
    </Form>
  );
}
