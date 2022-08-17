import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PolicyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ActionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResourceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProviderAccountMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProviderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ActionPolicyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ResourcePolicyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Policy {
  readonly id: string;
  readonly name: string;
  readonly actions?: (ActionPolicy | null)[] | null;
  readonly resources?: (ResourcePolicy | null)[] | null;
  readonly provider_account_id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Policy, PolicyMetaData>);
  static copyOf(source: Policy, mutator: (draft: MutableModel<Policy, PolicyMetaData>) => MutableModel<Policy, PolicyMetaData> | void): Policy;
}

export declare class Action {
  readonly id: string;
  readonly name: string;
  readonly provider_id: string;
  readonly policies?: (ActionPolicy | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Action, ActionMetaData>);
  static copyOf(source: Action, mutator: (draft: MutableModel<Action, ActionMetaData>) => MutableModel<Action, ActionMetaData> | void): Action;
}

export declare class Resource {
  readonly id: string;
  readonly name: string;
  readonly provider_account_id: string;
  readonly policies?: (ResourcePolicy | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Resource, ResourceMetaData>);
  static copyOf(source: Resource, mutator: (draft: MutableModel<Resource, ResourceMetaData>) => MutableModel<Resource, ResourceMetaData> | void): Resource;
}

export declare class ProviderAccount {
  readonly id: string;
  readonly name: string;
  readonly provider_id: string;
  readonly resources?: (Resource | null)[] | null;
  readonly policies?: (Policy | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ProviderAccount, ProviderAccountMetaData>);
  static copyOf(source: ProviderAccount, mutator: (draft: MutableModel<ProviderAccount, ProviderAccountMetaData>) => MutableModel<ProviderAccount, ProviderAccountMetaData> | void): ProviderAccount;
}

export declare class Provider {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly accounts?: (ProviderAccount | null)[] | null;
  readonly actions?: (Action | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Provider, ProviderMetaData>);
  static copyOf(source: Provider, mutator: (draft: MutableModel<Provider, ProviderMetaData>) => MutableModel<Provider, ProviderMetaData> | void): Provider;
}

export declare class ActionPolicy {
  readonly id: string;
  readonly policy: Policy;
  readonly action: Action;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ActionPolicy, ActionPolicyMetaData>);
  static copyOf(source: ActionPolicy, mutator: (draft: MutableModel<ActionPolicy, ActionPolicyMetaData>) => MutableModel<ActionPolicy, ActionPolicyMetaData> | void): ActionPolicy;
}

export declare class ResourcePolicy {
  readonly id: string;
  readonly policy: Policy;
  readonly resource: Resource;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ResourcePolicy, ResourcePolicyMetaData>);
  static copyOf(source: ResourcePolicy, mutator: (draft: MutableModel<ResourcePolicy, ResourcePolicyMetaData>) => MutableModel<ResourcePolicy, ResourcePolicyMetaData> | void): ResourcePolicy;
}