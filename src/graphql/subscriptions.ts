/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePolicy = /* GraphQL */ `
  subscription OnCreatePolicy {
    onCreatePolicy {
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
export const onUpdatePolicy = /* GraphQL */ `
  subscription OnUpdatePolicy {
    onUpdatePolicy {
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
export const onDeletePolicy = /* GraphQL */ `
  subscription OnDeletePolicy {
    onDeletePolicy {
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
export const onCreateAction = /* GraphQL */ `
  subscription OnCreateAction {
    onCreateAction {
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
export const onUpdateAction = /* GraphQL */ `
  subscription OnUpdateAction {
    onUpdateAction {
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
export const onDeleteAction = /* GraphQL */ `
  subscription OnDeleteAction {
    onDeleteAction {
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
export const onCreateProviderAccount = /* GraphQL */ `
  subscription OnCreateProviderAccount {
    onCreateProviderAccount {
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
export const onUpdateProviderAccount = /* GraphQL */ `
  subscription OnUpdateProviderAccount {
    onUpdateProviderAccount {
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
export const onDeleteProviderAccount = /* GraphQL */ `
  subscription OnDeleteProviderAccount {
    onDeleteProviderAccount {
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
export const onCreateProvider = /* GraphQL */ `
  subscription OnCreateProvider {
    onCreateProvider {
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
export const onUpdateProvider = /* GraphQL */ `
  subscription OnUpdateProvider {
    onUpdateProvider {
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
export const onDeleteProvider = /* GraphQL */ `
  subscription OnDeleteProvider {
    onDeleteProvider {
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
export const onCreateResource = /* GraphQL */ `
  subscription OnCreateResource {
    onCreateResource {
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
export const onUpdateResource = /* GraphQL */ `
  subscription OnUpdateResource {
    onUpdateResource {
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
export const onDeleteResource = /* GraphQL */ `
  subscription OnDeleteResource {
    onDeleteResource {
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
export const onCreateActionPolicy = /* GraphQL */ `
  subscription OnCreateActionPolicy {
    onCreateActionPolicy {
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
export const onUpdateActionPolicy = /* GraphQL */ `
  subscription OnUpdateActionPolicy {
    onUpdateActionPolicy {
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
export const onDeleteActionPolicy = /* GraphQL */ `
  subscription OnDeleteActionPolicy {
    onDeleteActionPolicy {
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
export const onCreateResourcePolicy = /* GraphQL */ `
  subscription OnCreateResourcePolicy {
    onCreateResourcePolicy {
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
export const onUpdateResourcePolicy = /* GraphQL */ `
  subscription OnUpdateResourcePolicy {
    onUpdateResourcePolicy {
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
export const onDeleteResourcePolicy = /* GraphQL */ `
  subscription OnDeleteResourcePolicy {
    onDeleteResourcePolicy {
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
