/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPolicy = /* GraphQL */ `
  query GetPolicy($id: ID!) {
    getPolicy(id: $id) {
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
export const listPolicies = /* GraphQL */ `
  query ListPolicies(
    $filter: ModelPolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolicies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAction = /* GraphQL */ `
  query GetAction($id: ID!) {
    getAction(id: $id) {
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
export const listActions = /* GraphQL */ `
  query ListActions(
    $filter: ModelActionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        provider_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProviderAccount = /* GraphQL */ `
  query GetProviderAccount($id: ID!) {
    getProviderAccount(id: $id) {
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
export const listProviderAccounts = /* GraphQL */ `
  query ListProviderAccounts(
    $filter: ModelProviderAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProviderAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        provider_id
        resources {
          nextToken
        }
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProvider = /* GraphQL */ `
  query GetProvider($id: ID!) {
    getProvider(id: $id) {
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
export const listProviders = /* GraphQL */ `
  query ListProviders(
    $filter: ModelProviderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProviders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        category
        accounts {
          nextToken
        }
        actions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResource = /* GraphQL */ `
  query GetResource($id: ID!) {
    getResource(id: $id) {
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
export const listResources = /* GraphQL */ `
  query ListResources(
    $filter: ModelResourceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResources(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        provider_account_id
        policies {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActionPolicy = /* GraphQL */ `
  query GetActionPolicy($id: ID!) {
    getActionPolicy(id: $id) {
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
export const listActionPolicies = /* GraphQL */ `
  query ListActionPolicies(
    $filter: ModelActionPolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActionPolicies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        policyID
        actionID
        policy {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        action {
          id
          name
          provider_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getResourcePolicy = /* GraphQL */ `
  query GetResourcePolicy($id: ID!) {
    getResourcePolicy(id: $id) {
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
export const listResourcePolicies = /* GraphQL */ `
  query ListResourcePolicies(
    $filter: ModelResourcePolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResourcePolicies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        policyID
        resourceID
        policy {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        resource {
          id
          name
          provider_account_id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
