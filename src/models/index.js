// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Policy, Action, Resource, ProviderAccount, Provider, ActionPolicy, ResourcePolicy } = initSchema(schema);

export {
  Policy,
  Action,
  Resource,
  ProviderAccount,
  Provider,
  ActionPolicy,
  ResourcePolicy
};