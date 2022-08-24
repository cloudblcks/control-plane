import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createAccessRole from "app/access-roles/mutations/createAccessRole";
import {
  AccessRoleForm,
  FORM_ERROR,
} from "app/access-roles/components/AccessRoleForm";
import getPolicies from "app/policies/queries/getPolicies";
import { useState, useTransition } from "react";


const ITEMS_PER_PAGE = 100;


const NewAccessRolePage = () => {
  const router = useRouter();
  const [createAccessRoleMutation] = useMutation(createAccessRole);
  const [{ policies, hasMore }] = usePaginatedQuery(getPolicies, {
    orderBy: { id: "asc" },
    take: ITEMS_PER_PAGE,
  });

  const [selectedPolicies, setSelectedPolicies] = useState(Array<number>())
  const [isPending, startTransition] = useTransition();

  const onSelectedPoliciesListChange = (selected: Array<number>) => {
    startTransition(() => {
      setSelectedPolicies(selected)
    })
  }

  return (
    <Layout title={"Create New AccessRole"}>
      <h1>Create New AccessRole</h1>

      <AccessRoleForm
        submitText="Create AccessRole"
        policies={policies.map((x) => { return { label: x.name, value: x.id.toString() } })}
        onPolicyListChange={onSelectedPoliciesListChange}
        onSubmit={async (values) => {
          try {
            const accessRole = await createAccessRoleMutation({
              name: values.name,
              policy_ids: selectedPolicies
            });
            router.push(
              Routes.ShowAccessRolePage({ accessRoleId: accessRole.id })
            );
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.AccessRolesPage()}>
          <a>AccessRoles</a>
        </Link>
      </p>
    </Layout>
  );
};

NewAccessRolePage.authenticate = true;

export default NewAccessRolePage;
