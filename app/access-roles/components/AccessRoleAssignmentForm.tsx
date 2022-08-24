import { AccessRole } from "@prisma/client";
import { Form, FormProps } from "app/core/components/Form";
import LabeledSelectField, { LabeledSelectOption } from "app/core/components/LabeledSelect";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export interface AccessRoleAssignmentFormProps {
  accessRole: AccessRole
  resources: Array<LabeledSelectOption>
}

export function AccessRoleAssignmentForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & AccessRoleAssignmentFormProps
) {
  return (
    <Form<S> {...props}>
      <LabeledSelectField name="resource_id" label="Resource" options={props.resources} />
    </Form>
  );
}
