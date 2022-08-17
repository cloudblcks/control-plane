/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePolicyInput = {
  id?: string | null,
  name: string,
  provider_account_id: string,
};

export type ModelPolicyConditionInput = {
  name?: ModelStringInput | null,
  provider_account_id?: ModelIDInput | null,
  and?: Array< ModelPolicyConditionInput | null > | null,
  or?: Array< ModelPolicyConditionInput | null > | null,
  not?: ModelPolicyConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Policy = {
  __typename: "Policy",
  id: string,
  name: string,
  actions?: ModelActionPolicyConnection | null,
  resources?: ModelResourcePolicyConnection | null,
  provider_account_id: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelActionPolicyConnection = {
  __typename: "ModelActionPolicyConnection",
  items:  Array<ActionPolicy | null >,
  nextToken?: string | null,
};

export type ActionPolicy = {
  __typename: "ActionPolicy",
  id: string,
  policyID: string,
  actionID: string,
  policy: Policy,
  action: Action,
  createdAt: string,
  updatedAt: string,
};

export type Action = {
  __typename: "Action",
  id: string,
  name: string,
  provider_id: string,
  policies?: ModelActionPolicyConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelResourcePolicyConnection = {
  __typename: "ModelResourcePolicyConnection",
  items:  Array<ResourcePolicy | null >,
  nextToken?: string | null,
};

export type ResourcePolicy = {
  __typename: "ResourcePolicy",
  id: string,
  policyID: string,
  resourceID: string,
  policy: Policy,
  resource: Resource,
  createdAt: string,
  updatedAt: string,
};

export type Resource = {
  __typename: "Resource",
  id: string,
  name: string,
  provider_account_id: string,
  policies?: ModelResourcePolicyConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePolicyInput = {
  id: string,
  name?: string | null,
  provider_account_id?: string | null,
};

export type DeletePolicyInput = {
  id: string,
};

export type CreateActionInput = {
  id?: string | null,
  name: string,
  provider_id: string,
};

export type ModelActionConditionInput = {
  name?: ModelStringInput | null,
  provider_id?: ModelIDInput | null,
  and?: Array< ModelActionConditionInput | null > | null,
  or?: Array< ModelActionConditionInput | null > | null,
  not?: ModelActionConditionInput | null,
};

export type UpdateActionInput = {
  id: string,
  name?: string | null,
  provider_id?: string | null,
};

export type DeleteActionInput = {
  id: string,
};

export type CreateProviderAccountInput = {
  id?: string | null,
  name: string,
  provider_id: string,
};

export type ModelProviderAccountConditionInput = {
  name?: ModelStringInput | null,
  provider_id?: ModelIDInput | null,
  and?: Array< ModelProviderAccountConditionInput | null > | null,
  or?: Array< ModelProviderAccountConditionInput | null > | null,
  not?: ModelProviderAccountConditionInput | null,
};

export type ProviderAccount = {
  __typename: "ProviderAccount",
  id: string,
  name: string,
  provider_id: string,
  resources?: ModelResourceConnection | null,
  policies?: ModelPolicyConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelResourceConnection = {
  __typename: "ModelResourceConnection",
  items:  Array<Resource | null >,
  nextToken?: string | null,
};

export type ModelPolicyConnection = {
  __typename: "ModelPolicyConnection",
  items:  Array<Policy | null >,
  nextToken?: string | null,
};

export type UpdateProviderAccountInput = {
  id: string,
  name?: string | null,
  provider_id?: string | null,
};

export type DeleteProviderAccountInput = {
  id: string,
};

export type CreateProviderInput = {
  id?: string | null,
  name: string,
  category: string,
};

export type ModelProviderConditionInput = {
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  and?: Array< ModelProviderConditionInput | null > | null,
  or?: Array< ModelProviderConditionInput | null > | null,
  not?: ModelProviderConditionInput | null,
};

export type Provider = {
  __typename: "Provider",
  id: string,
  name: string,
  category: string,
  accounts?: ModelProviderAccountConnection | null,
  actions?: ModelActionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelProviderAccountConnection = {
  __typename: "ModelProviderAccountConnection",
  items:  Array<ProviderAccount | null >,
  nextToken?: string | null,
};

export type ModelActionConnection = {
  __typename: "ModelActionConnection",
  items:  Array<Action | null >,
  nextToken?: string | null,
};

export type UpdateProviderInput = {
  id: string,
  name?: string | null,
  category?: string | null,
};

export type DeleteProviderInput = {
  id: string,
};

export type CreateResourceInput = {
  id?: string | null,
  name: string,
  provider_account_id: string,
};

export type ModelResourceConditionInput = {
  name?: ModelStringInput | null,
  provider_account_id?: ModelIDInput | null,
  and?: Array< ModelResourceConditionInput | null > | null,
  or?: Array< ModelResourceConditionInput | null > | null,
  not?: ModelResourceConditionInput | null,
};

export type UpdateResourceInput = {
  id: string,
  name?: string | null,
  provider_account_id?: string | null,
};

export type DeleteResourceInput = {
  id: string,
};

export type CreateActionPolicyInput = {
  id?: string | null,
  policyID: string,
  actionID: string,
};

export type ModelActionPolicyConditionInput = {
  policyID?: ModelIDInput | null,
  actionID?: ModelIDInput | null,
  and?: Array< ModelActionPolicyConditionInput | null > | null,
  or?: Array< ModelActionPolicyConditionInput | null > | null,
  not?: ModelActionPolicyConditionInput | null,
};

export type UpdateActionPolicyInput = {
  id: string,
  policyID?: string | null,
  actionID?: string | null,
};

export type DeleteActionPolicyInput = {
  id: string,
};

export type CreateResourcePolicyInput = {
  id?: string | null,
  policyID: string,
  resourceID: string,
};

export type ModelResourcePolicyConditionInput = {
  policyID?: ModelIDInput | null,
  resourceID?: ModelIDInput | null,
  and?: Array< ModelResourcePolicyConditionInput | null > | null,
  or?: Array< ModelResourcePolicyConditionInput | null > | null,
  not?: ModelResourcePolicyConditionInput | null,
};

export type UpdateResourcePolicyInput = {
  id: string,
  policyID?: string | null,
  resourceID?: string | null,
};

export type DeleteResourcePolicyInput = {
  id: string,
};

export type ModelPolicyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  provider_account_id?: ModelIDInput | null,
  and?: Array< ModelPolicyFilterInput | null > | null,
  or?: Array< ModelPolicyFilterInput | null > | null,
  not?: ModelPolicyFilterInput | null,
};

export type ModelActionFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  provider_id?: ModelIDInput | null,
  and?: Array< ModelActionFilterInput | null > | null,
  or?: Array< ModelActionFilterInput | null > | null,
  not?: ModelActionFilterInput | null,
};

export type ModelProviderAccountFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  provider_id?: ModelIDInput | null,
  and?: Array< ModelProviderAccountFilterInput | null > | null,
  or?: Array< ModelProviderAccountFilterInput | null > | null,
  not?: ModelProviderAccountFilterInput | null,
};

export type ModelProviderFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  category?: ModelStringInput | null,
  and?: Array< ModelProviderFilterInput | null > | null,
  or?: Array< ModelProviderFilterInput | null > | null,
  not?: ModelProviderFilterInput | null,
};

export type ModelProviderConnection = {
  __typename: "ModelProviderConnection",
  items:  Array<Provider | null >,
  nextToken?: string | null,
};

export type ModelResourceFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  provider_account_id?: ModelIDInput | null,
  and?: Array< ModelResourceFilterInput | null > | null,
  or?: Array< ModelResourceFilterInput | null > | null,
  not?: ModelResourceFilterInput | null,
};

export type ModelActionPolicyFilterInput = {
  id?: ModelIDInput | null,
  policyID?: ModelIDInput | null,
  actionID?: ModelIDInput | null,
  and?: Array< ModelActionPolicyFilterInput | null > | null,
  or?: Array< ModelActionPolicyFilterInput | null > | null,
  not?: ModelActionPolicyFilterInput | null,
};

export type ModelResourcePolicyFilterInput = {
  id?: ModelIDInput | null,
  policyID?: ModelIDInput | null,
  resourceID?: ModelIDInput | null,
  and?: Array< ModelResourcePolicyFilterInput | null > | null,
  or?: Array< ModelResourcePolicyFilterInput | null > | null,
  not?: ModelResourcePolicyFilterInput | null,
};

export type CreatePolicyMutationVariables = {
  input: CreatePolicyInput,
  condition?: ModelPolicyConditionInput | null,
};

export type CreatePolicyMutation = {
  createPolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePolicyMutationVariables = {
  input: UpdatePolicyInput,
  condition?: ModelPolicyConditionInput | null,
};

export type UpdatePolicyMutation = {
  updatePolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePolicyMutationVariables = {
  input: DeletePolicyInput,
  condition?: ModelPolicyConditionInput | null,
};

export type DeletePolicyMutation = {
  deletePolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateActionMutationVariables = {
  input: CreateActionInput,
  condition?: ModelActionConditionInput | null,
};

export type CreateActionMutation = {
  createAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActionMutationVariables = {
  input: UpdateActionInput,
  condition?: ModelActionConditionInput | null,
};

export type UpdateActionMutation = {
  updateAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActionMutationVariables = {
  input: DeleteActionInput,
  condition?: ModelActionConditionInput | null,
};

export type DeleteActionMutation = {
  deleteAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProviderAccountMutationVariables = {
  input: CreateProviderAccountInput,
  condition?: ModelProviderAccountConditionInput | null,
};

export type CreateProviderAccountMutation = {
  createProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProviderAccountMutationVariables = {
  input: UpdateProviderAccountInput,
  condition?: ModelProviderAccountConditionInput | null,
};

export type UpdateProviderAccountMutation = {
  updateProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProviderAccountMutationVariables = {
  input: DeleteProviderAccountInput,
  condition?: ModelProviderAccountConditionInput | null,
};

export type DeleteProviderAccountMutation = {
  deleteProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProviderMutationVariables = {
  input: CreateProviderInput,
  condition?: ModelProviderConditionInput | null,
};

export type CreateProviderMutation = {
  createProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProviderMutationVariables = {
  input: UpdateProviderInput,
  condition?: ModelProviderConditionInput | null,
};

export type UpdateProviderMutation = {
  updateProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProviderMutationVariables = {
  input: DeleteProviderInput,
  condition?: ModelProviderConditionInput | null,
};

export type DeleteProviderMutation = {
  deleteProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateResourceMutationVariables = {
  input: CreateResourceInput,
  condition?: ModelResourceConditionInput | null,
};

export type CreateResourceMutation = {
  createResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateResourceMutationVariables = {
  input: UpdateResourceInput,
  condition?: ModelResourceConditionInput | null,
};

export type UpdateResourceMutation = {
  updateResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteResourceMutationVariables = {
  input: DeleteResourceInput,
  condition?: ModelResourceConditionInput | null,
};

export type DeleteResourceMutation = {
  deleteResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateActionPolicyMutationVariables = {
  input: CreateActionPolicyInput,
  condition?: ModelActionPolicyConditionInput | null,
};

export type CreateActionPolicyMutation = {
  createActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActionPolicyMutationVariables = {
  input: UpdateActionPolicyInput,
  condition?: ModelActionPolicyConditionInput | null,
};

export type UpdateActionPolicyMutation = {
  updateActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActionPolicyMutationVariables = {
  input: DeleteActionPolicyInput,
  condition?: ModelActionPolicyConditionInput | null,
};

export type DeleteActionPolicyMutation = {
  deleteActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateResourcePolicyMutationVariables = {
  input: CreateResourcePolicyInput,
  condition?: ModelResourcePolicyConditionInput | null,
};

export type CreateResourcePolicyMutation = {
  createResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateResourcePolicyMutationVariables = {
  input: UpdateResourcePolicyInput,
  condition?: ModelResourcePolicyConditionInput | null,
};

export type UpdateResourcePolicyMutation = {
  updateResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteResourcePolicyMutationVariables = {
  input: DeleteResourcePolicyInput,
  condition?: ModelResourcePolicyConditionInput | null,
};

export type DeleteResourcePolicyMutation = {
  deleteResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPolicyQueryVariables = {
  id: string,
};

export type GetPolicyQuery = {
  getPolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPoliciesQueryVariables = {
  filter?: ModelPolicyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPoliciesQuery = {
  listPolicies?:  {
    __typename: "ModelPolicyConnection",
    items:  Array< {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetActionQueryVariables = {
  id: string,
};

export type GetActionQuery = {
  getAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActionsQueryVariables = {
  filter?: ModelActionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActionsQuery = {
  listActions?:  {
    __typename: "ModelActionConnection",
    items:  Array< {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProviderAccountQueryVariables = {
  id: string,
};

export type GetProviderAccountQuery = {
  getProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProviderAccountsQueryVariables = {
  filter?: ModelProviderAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProviderAccountsQuery = {
  listProviderAccounts?:  {
    __typename: "ModelProviderAccountConnection",
    items:  Array< {
      __typename: "ProviderAccount",
      id: string,
      name: string,
      provider_id: string,
      resources?:  {
        __typename: "ModelResourceConnection",
        nextToken?: string | null,
      } | null,
      policies?:  {
        __typename: "ModelPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProviderQueryVariables = {
  id: string,
};

export type GetProviderQuery = {
  getProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProvidersQueryVariables = {
  filter?: ModelProviderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProvidersQuery = {
  listProviders?:  {
    __typename: "ModelProviderConnection",
    items:  Array< {
      __typename: "Provider",
      id: string,
      name: string,
      category: string,
      accounts?:  {
        __typename: "ModelProviderAccountConnection",
        nextToken?: string | null,
      } | null,
      actions?:  {
        __typename: "ModelActionConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetResourceQueryVariables = {
  id: string,
};

export type GetResourceQuery = {
  getResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListResourcesQueryVariables = {
  filter?: ModelResourceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListResourcesQuery = {
  listResources?:  {
    __typename: "ModelResourceConnection",
    items:  Array< {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetActionPolicyQueryVariables = {
  id: string,
};

export type GetActionPolicyQuery = {
  getActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActionPoliciesQueryVariables = {
  filter?: ModelActionPolicyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActionPoliciesQuery = {
  listActionPolicies?:  {
    __typename: "ModelActionPolicyConnection",
    items:  Array< {
      __typename: "ActionPolicy",
      id: string,
      policyID: string,
      actionID: string,
      policy:  {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      },
      action:  {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetResourcePolicyQueryVariables = {
  id: string,
};

export type GetResourcePolicyQuery = {
  getResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListResourcePoliciesQueryVariables = {
  filter?: ModelResourcePolicyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListResourcePoliciesQuery = {
  listResourcePolicies?:  {
    __typename: "ModelResourcePolicyConnection",
    items:  Array< {
      __typename: "ResourcePolicy",
      id: string,
      policyID: string,
      resourceID: string,
      policy:  {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      },
      resource:  {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePolicySubscription = {
  onCreatePolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePolicySubscription = {
  onUpdatePolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePolicySubscription = {
  onDeletePolicy?:  {
    __typename: "Policy",
    id: string,
    name: string,
    actions?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    resources?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    provider_account_id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateActionSubscription = {
  onCreateAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActionSubscription = {
  onUpdateAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActionSubscription = {
  onDeleteAction?:  {
    __typename: "Action",
    id: string,
    name: string,
    provider_id: string,
    policies?:  {
      __typename: "ModelActionPolicyConnection",
      items:  Array< {
        __typename: "ActionPolicy",
        id: string,
        policyID: string,
        actionID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProviderAccountSubscription = {
  onCreateProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProviderAccountSubscription = {
  onUpdateProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProviderAccountSubscription = {
  onDeleteProviderAccount?:  {
    __typename: "ProviderAccount",
    id: string,
    name: string,
    provider_id: string,
    resources?:  {
      __typename: "ModelResourceConnection",
      items:  Array< {
        __typename: "Resource",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    policies?:  {
      __typename: "ModelPolicyConnection",
      items:  Array< {
        __typename: "Policy",
        id: string,
        name: string,
        provider_account_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProviderSubscription = {
  onCreateProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProviderSubscription = {
  onUpdateProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProviderSubscription = {
  onDeleteProvider?:  {
    __typename: "Provider",
    id: string,
    name: string,
    category: string,
    accounts?:  {
      __typename: "ModelProviderAccountConnection",
      items:  Array< {
        __typename: "ProviderAccount",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    actions?:  {
      __typename: "ModelActionConnection",
      items:  Array< {
        __typename: "Action",
        id: string,
        name: string,
        provider_id: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateResourceSubscription = {
  onCreateResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateResourceSubscription = {
  onUpdateResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteResourceSubscription = {
  onDeleteResource?:  {
    __typename: "Resource",
    id: string,
    name: string,
    provider_account_id: string,
    policies?:  {
      __typename: "ModelResourcePolicyConnection",
      items:  Array< {
        __typename: "ResourcePolicy",
        id: string,
        policyID: string,
        resourceID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateActionPolicySubscription = {
  onCreateActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActionPolicySubscription = {
  onUpdateActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActionPolicySubscription = {
  onDeleteActionPolicy?:  {
    __typename: "ActionPolicy",
    id: string,
    policyID: string,
    actionID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    action:  {
      __typename: "Action",
      id: string,
      name: string,
      provider_id: string,
      policies?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateResourcePolicySubscription = {
  onCreateResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateResourcePolicySubscription = {
  onUpdateResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteResourcePolicySubscription = {
  onDeleteResourcePolicy?:  {
    __typename: "ResourcePolicy",
    id: string,
    policyID: string,
    resourceID: string,
    policy:  {
      __typename: "Policy",
      id: string,
      name: string,
      actions?:  {
        __typename: "ModelActionPolicyConnection",
        nextToken?: string | null,
      } | null,
      resources?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      provider_account_id: string,
      createdAt: string,
      updatedAt: string,
    },
    resource:  {
      __typename: "Resource",
      id: string,
      name: string,
      provider_account_id: string,
      policies?:  {
        __typename: "ModelResourcePolicyConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
