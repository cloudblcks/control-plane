import { Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import {
  FORM_ERROR, ProviderForm
} from "app/providers/components/ProviderForm";
import createProvider from "app/providers/mutations/createProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

const NewProvider = () => {
  const router = useRouter();
  const [createProviderMutation] = useMutation(createProvider);

  return (
    <>
      <h1>Create New Provider</h1>

      <ProviderForm
        submitText="Create Provider"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateProvider}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const provider = await createProviderMutation(values);
            void router.push(Routes.ShowProviderPage({ providerId: provider.id }));
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


const NewProviderPage = () => {
  return (
    <AuthorizedLayout title="New Provider">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <NewProvider />
        </Suspense>

        <p>
          <Link href={Routes.ProvidersPage()}>
            <a>Providers</a>
          </Link>
        </p>
      </div>
    </AuthorizedLayout>
  );
};

NewProviderPage.authenticate = true;


export default NewProviderPage;
