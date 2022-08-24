import { Action, Resource } from "@prisma/client";
import { Form, FormProps } from "app/core/components/Form";
import LabeledSelectField, { LabeledSelectOption } from "app/core/components/LabeledSelect";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { Suspense, useState, useTransition } from "react";
import { number, string, z } from "zod";
import { OnChange } from "react-final-form-listeners"
import getResources from "app/resources/queries/getResources";
import router from "next/router";
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc";
import LabeledCheckboxGroup from "app/core/components/LabeledCheckboxGroup";
import getActions from "app/actions/queries/getActions";
import getActionsForProviderAccount from "app/actions/queries/getActionsForProviderAccount";
import getAction from "app/actions/queries/getAction";
import getProviderAccount from "app/provider-accounts/queries/getProviderAccount";
import getProvider from "app/providers/queries/getProvider";

export { FORM_ERROR } from "app/core/components/Form";


export interface PolicyFormProps {
  options: Array<LabeledSelectOption>
  onActionsListChange: (selected: Array<number>) => void
}

const ITEMS_PER_PAGE = 100;

export function PolicyForm<S extends z.ZodType<any, any>>(props: FormProps<S> & PolicyFormProps) {
  // const [resourcesState, setResources] = useState(Array<Resource>)
  // const [actionsState, setActions] = useState(Array<Action>)
  const [selectedProviderAccount, setSelectedProviderAccount] = useState(1)
  const resourcesPage = 0;
  const [{ resources }] = usePaginatedQuery(getResources, {
    orderBy: { id: "asc" },
    take: ITEMS_PER_PAGE,
    where: { provider_account_id: selectedProviderAccount }
  });

  const [isPending, startTransition] = useTransition();

  const handleProviderSelection = (value) => {
    startTransition(() => {
      setSelectedProviderAccount(parseInt(value))
    })
  }

  // const [actions] = useQuery(getActionsForProviderAccount, { id: selectedProviderAccount });

  const [providerAccount] = useQuery(getProviderAccount, {
    id: selectedProviderAccount
  })
  const [provider] = useQuery(getProvider, { id: providerAccount.provider_id })
  const [{ actions }] = useQuery(getActions, { where: { provider_id: provider.id } })

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledSelectField name="provider_account_id" label="Account" options={props.options} />
      <OnChange name="provider_account_id">
        {(value, previous) => {
          handleProviderSelection(value)
          // props.resourcesForProviderAccount(value).then((value) => setResources(value), () => { })
          // props.actionsForProviderAccount(value).then((value) => setActions(value), () => { })
        }}
      </OnChange>
      <LabeledSelectField name="resource_id" label="Resource" options={resources.map((resource) => { return { label: resource.name, value: resource.id.toString() } })} />
      <LabeledCheckboxGroup
        onSelectionChange={(x: Array<string>) => props.onActionsListChange(x.map(y => parseInt(y)))}
        name="testCheckbox"
        label="Test"
        options={actions.map((action) => { return { label: action.name, value: action.id.toString() } })}
      />
    </Form>
  );
}
