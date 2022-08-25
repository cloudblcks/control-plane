import { NextApiRequest, NextApiResponse } from "next";
import db, { Action } from "db";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // Get data from your database
  const generateAblyAPIKey = (
    controlApiToken: string,
    appId: string,
    channels: Array<string> | null,
    capabilities: Array<string>
  ) => {
    return "";
  };
  const requester = parseInt(_req.query.requester!.toString());
  const target = parseInt(_req.query.target!.toString());
  const target_provider = _req.query.target_provider!.toString();
  if (target_provider === "ably") {
    // const requesterResource = await db.resource.findFirst({ where: { id: requester } })
    // const providerAccount = await db.providerAccount.findFirst({where: {id: requesterResource!.provider_account_id}})\
    const resourceAccessRoles = await db.resourceAccessRoles.findMany({
      where: {
        resource_id: requester,
      },
      include: {
        access_role: {
          include: {
            AccessRolePolicies: {
              include: {
                policy: {
                  include: {
                    PolicyResources: {
                      include: {
                        resource: true,
                      },
                    },
                    PolicyActions: {
                      include: {
                        action: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    //TODO: fix - currently very naive implementation, doesn't consider that there may be multiple access roles assigned to one resource
    var credentials: string = "";

    for (var rar of resourceAccessRoles) {
      const accessRole = rar.access_role;
      for (var arp of accessRole.AccessRolePolicies) {
        const policy = arp.policy;
        if (policy.PolicyResources[0]!.resource_id === target) {
          const actions = policy.PolicyActions.map((x) => x.action);
          if (rar.credentials) {
            credentials = rar.credentials;
          } else {
            // credentials = generateAblyAPIKey()
          }
        }
      }
    }
  }
  res.status(200).json(_req.query);

  // if (
  //   resourceAccessRoles
  //   .map((role) => {
  //     return (role.access_role.AccessRolePolicies
  //       .map((arp) => {
  //         return arp.policy.PolicyResources[0]!.resource_id === target
  //       })
  //       .reduce((previousValue, currentValue) => previousValue || currentValue, false) ? role.credentials : false)
  //   })
  //   .reduce((previousValue, currentValue) => previousValue || currentValue, false)
  // ) {

  // } else {
  //   res.status(403).json("No access")
  // }
}
