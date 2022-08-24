import {
  NextApiRequest,
  NextApiResponse
} from "next";
import db from "db";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  // Get data from your database

  const requester = parseInt(_req.query.requester!.toString())
  const target = parseInt(_req.query.target!.toString())
  // const requesterResource = await db.resource.findFirst({ where: { id: requester } })
  // const providerAccount = await db.providerAccount.findFirst({where: {id: requesterResource!.provider_account_id}})\
  const resourceAccessRoles = await db.resourceAccessRoles.findMany({
    where: {
      resource_id: requester
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
                      resource: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })


  if (
    resourceAccessRoles
    .map((role) => {
      return (role.access_role.AccessRolePolicies
        .map((arp) => {
          return arp.policy.PolicyResources[0]!.resource_id === target
        })
        .reduce((previousValue, currentValue) => previousValue || currentValue, false) ? role.credentials : false)
    })
    .reduce((previousValue, currentValue) => previousValue || currentValue, false)
  ) {

    res.status(200).json()
  } else {
    res.status(403).json("No access")
  }
}
