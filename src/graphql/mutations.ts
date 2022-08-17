/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPolicy = /* GraphQL */ `
  mutation CreatePolicy(
    $input: CreatePolicyInput!
    $condition: ModelPolicyConditionInput
  ) {
    createPolicy(input: $input, condition: $condition) {
      id
      name
      actions {
        items {
          id
          policyID
          actionID
          createdAt
          updatedAt
        }
        nextToken
      }
      resources {
        items {
          id
          policyID
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      provider_account_id
      createdAt
      updatedAt
    }
  }
`;
export const updatePolicy = /* GraphQL */ `
  mutation UpdatePolicy(
    $input: UpdatePolicyInput!
    $condition: ModelPolicyConditionInput
  ) {
    updatePolicy(input: $input, condition: $condition) {
      id
      name
      actions {
        items {
          id
          policyID
          actionID
          createdAt
          updatedAt
        }
        nextToken
      }
      resources {
        items {
          id
          policyID
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      provider_account_id
      createdAt
      updatedAt
    }
  }
`;
export const deletePolicy = /* GraphQL */ `
  mutation DeletePolicy(
    $input: DeletePolicyInput!
    $condition: ModelPolicyConditionInput
  ) {
    deletePolicy(input: $input, condition: $condition) {
      id
      name
      actions {
        items {
          id
          policyID
          actionID
          createdAt
          updatedAt
        }
        nextToken
      }
      resources {
        items {
          id
          policyID
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      provider_account_id
      createdAt
      updatedAt
    }
  }
`;
export const createAction = /* GraphQL */ `
  mutation CreateAction(
    $input: CreateActionInput!
    $condition: ModelActionConditionInput
  ) {
    createAction(input: $input, condition: $condition) {
      id
      name
      provider_id
      policies {
        items {
          id
          policyID
          actionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateAction = /* GraphQL */ `
  mutation UpdateAction(
    $input: UpdateActionInput!
    $condition: ModelActionConditionInput
  ) {
    updateAction(input: $input, condition: $condition) {
      id
      name
      provider_id
      policies {
        items {
          id
          policyID
          actionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteAction = /* GraphQL */ `
  mutation DeleteAction(
    $input: DeleteActionInput!
    $condition: ModelActionConditionInput
  ) {
    deleteAction(input: $input, condition: $condition) {
      id
      name
      provider_id
      policies {
        items {
          id
          policyID
          actionID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProviderAccount = /* GraphQL */ `
  mutation CreateProviderAccount(
    $input: CreateProviderAccountInput!
    $condition: ModelProviderAccountConditionInput
  ) {
    createProviderAccount(input: $input, condition: $condition) {
      id
      name
      provider_id
      resources {
        items {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        nextToken
      }
      policies {
        items {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProviderAccount = /* GraphQL */ `
  mutation UpdateProviderAccount(
    $input: UpdateProviderAccountInput!
    $condition: ModelProviderAccountConditionInput
  ) {
    updateProviderAccount(input: $input, condition: $condition) {
      id
      name
      provider_id
      resources {
        items {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        nextToken
      }
      policies {
        items {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProviderAccount = /* GraphQL */ `
  mutation DeleteProviderAccount(
    $input: DeleteProviderAccountInput!
    $condition: ModelProviderAccountConditionInput
  ) {
    deleteProviderAccount(input: $input, condition: $condition) {
      id
      name
      provider_id
      resources {
        items {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        nextToken
      }
      policies {
        items {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createProvider = /* GraphQL */ `
  mutation CreateProvider(
    $input: CreateProviderInput!
    $condition: ModelProviderConditionInput
  ) {
    createProvider(input: $input, condition: $condition) {
      id
      name
      category
      accounts {
        items {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        nextToken
      }
      actions {
        items {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateProvider = /* GraphQL */ `
  mutation UpdateProvider(
    $input: UpdateProviderInput!
    $condition: ModelProviderConditionInput
  ) {
    updateProvider(input: $input, condition: $condition) {
      id
      name
      category
      accounts {
        items {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        nextToken
      }
      actions {
        items {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteProvider = /* GraphQL */ `
  mutation DeleteProvider(
    $input: DeleteProviderInput!
    $condition: ModelProviderConditionInput
  ) {
    deleteProvider(input: $input, condition: $condition) {
      id
      name
      category
      accounts {
        items {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        nextToken
      }
      actions {
        items {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createResource = /* GraphQL */ `
  mutation CreateResource(
    $input: CreateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    createResource(input: $input, condition: $condition) {
      id
      name
      provider_account_id
      policies {
        items {
          id
          policyID
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateResource = /* GraphQL */ `
  mutation UpdateResource(
    $input: UpdateResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    updateResource(input: $input, condition: $condition) {
      id
      name
      provider_account_id
      policies {
        items {
          id
          policyID
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteResource = /* GraphQL */ `
  mutation DeleteResource(
    $input: DeleteResourceInput!
    $condition: ModelResourceConditionInput
  ) {
    deleteResource(input: $input, condition: $condition) {
      id
      name
      provider_account_id
      policies {
        items {
          id
          policyID
          resourceID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createActionPolicy = /* GraphQL */ `
  mutation CreateActionPolicy(
    $input: CreateActionPolicyInput!
    $condition: ModelActionPolicyConditionInput
  ) {
    createActionPolicy(input: $input, condition: $condition) {
      id
      policyID
      actionID
      policy {
        id
        name
        actions {
          nextToken
        }
        resources {
          nextToken
        }
        provider_account_id
        createdAt
        updatedAt
      }
      action {
        id
        name
        provider_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateActionPolicy = /* GraphQL */ `
  mutation UpdateActionPolicy(
    $input: UpdateActionPolicyInput!
    $condition: ModelActionPolicyConditionInput
  ) {
    updateActionPolicy(input: $input, condition: $condition) {
      id
      policyID
      actionID
      policy {
        id
        name
        actions {
          nextToken
        }
        resources {
          nextToken
        }
        provider_account_id
        createdAt
        updatedAt
      }
      action {
        id
        name
        provider_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteActionPolicy = /* GraphQL */ `
  mutation DeleteActionPolicy(
    $input: DeleteActionPolicyInput!
    $condition: ModelActionPolicyConditionInput
  ) {
    deleteActionPolicy(input: $input, condition: $condition) {
      id
      policyID
      actionID
      policy {
        id
        name
        actions {
          nextToken
        }
        resources {
          nextToken
        }
        provider_account_id
        createdAt
        updatedAt
      }
      action {
        id
        name
        provider_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createResourcePolicy = /* GraphQL */ `
  mutation CreateResourcePolicy(
    $input: CreateResourcePolicyInput!
    $condition: ModelResourcePolicyConditionInput
  ) {
    createResourcePolicy(input: $input, condition: $condition) {
      id
      policyID
      resourceID
      policy {
        id
        name
        actions {
          nextToken
        }
        resources {
          nextToken
        }
        provider_account_id
        createdAt
        updatedAt
      }
      resource {
        id
        name
        provider_account_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateResourcePolicy = /* GraphQL */ `
  mutation UpdateResourcePolicy(
    $input: UpdateResourcePolicyInput!
    $condition: ModelResourcePolicyConditionInput
  ) {
    updateResourcePolicy(input: $input, condition: $condition) {
      id
      policyID
      resourceID
      policy {
        id
        name
        actions {
          nextToken
        }
        resources {
          nextToken
        }
        provider_account_id
        createdAt
        updatedAt
      }
      resource {
        id
        name
        provider_account_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteResourcePolicy = /* GraphQL */ `
  mutation DeleteResourcePolicy(
    $input: DeleteResourcePolicyInput!
    $condition: ModelResourcePolicyConditionInput
  ) {
    deleteResourcePolicy(input: $input, condition: $condition) {
      id
      policyID
      resourceID
      policy {
        id
        name
        actions {
          nextToken
        }
        resources {
          nextToken
        }
        provider_account_id
        createdAt
        updatedAt
      }
      resource {
        id
        name
        provider_account_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
