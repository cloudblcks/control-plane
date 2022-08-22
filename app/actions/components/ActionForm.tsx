import { Action } from "@prisma/client";
import { Form, FormProps } from "app/core/components/Form";
import LabeledSelectField, { LabeledSelectOption } from "app/core/components/LabeledSelect";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export interface ActionFormProps {
  options: Array<LabeledSelectOption>
}

export function ActionForm<S extends z.ZodType<any, any>>(props: FormProps<S> & ActionFormProps) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledSelectField name="provider_id" label="Provider" options={props.options} />
    </Form>
  );
}
