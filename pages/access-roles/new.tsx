import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import createAccessRole from "app/access-roles/mutations/createAccessRole";
import {
  AccessRoleForm,
  FORM_ERROR,
} from "app/access-roles/components/AccessRoleForm";
import getPolicies from "app/policies/queries/getPolicies";
import { Suspense, useState, useTransition } from "react";


const ITEMS_PER_PAGE = 100;


const NewAccessRole = () => {
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
    <>
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
            void router.push(
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


    </>
  );
};


const NewAccessRolePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewAccessRole />
      </Suspense>

      <p>
        <Link href={Routes.AccessRolesPage()}>
          <a>AccessRoles</a>
        </Link>
      </p>
    </div>
  );
};

NewAccessRolePage.authenticate = true;
NewAccessRolePage.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;


export default NewAccessRolePage;
