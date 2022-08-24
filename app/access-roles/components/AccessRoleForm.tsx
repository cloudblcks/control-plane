import { Form, FormProps } from "app/core/components/Form";
import LabeledCheckboxGroup, { LabeledCheckboxGroupOption } from "app/core/components/LabeledCheckboxGroup";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export interface AccessRoleFormProps {
  policies: Array<LabeledCheckboxGroupOption>
  onPolicyListChange: (selected: Array<number>) => void
}

export function AccessRoleForm<S extends z.ZodType<any, any>>(
  props: FormProps<S> & AccessRoleFormProps
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledCheckboxGroup
        onSelectionChange={(x: Array<string>) => props.onPolicyListChange(x.map(y => parseInt(y)))}
        name="Policies"
        label="Policies"
        options={props.policies}
      />
    </Form>
  );
}
