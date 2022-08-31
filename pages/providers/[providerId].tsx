import { Routes, useParam } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Anchor, Box, Breadcrumbs, Button, Group, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { Provider } from "@prisma/client";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import deleteProvider from "app/providers/mutations/deleteProvider";
import getProvider from "app/providers/queries/getProvider";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

export const ProviderView = (props: { provider: Provider }) => {
  const router = useRouter();
  const [deleteProviderMutation] = useMutation(deleteProvider);
  const provider = props.provider
  return (
    <>
      <Head>
        <title>Provider {provider.id}</title>
      </Head>
      <Text><Text weight={500} component="span">Provider name:</Text> {provider.name}</Text>
      <Text><Text weight={500} component="span">Provider category:</Text> {provider.category}</Text>
      <Text weight={500}>Raw:</Text>
      <Prism language="json">{JSON.stringify(provider, null, 2)}</Prism>
      <Group align="right" mt="lg">
        <Link href={Routes.EditProviderPage({ providerId: provider.id })}>
          <Button>
            Edit
          </Button>
        </Link>
        <Button variant="outline" color="red" onClick={async () => {
          if (window.confirm("Provider " + provider.name + " will be deleted. Are you sure?")) {
            await deleteProviderMutation({ id: provider.id });
            void router.push(Routes.ProvidersPage());
          }
        }}>
          Delete
        </Button>
      </Group>
    </>
  );
};

const ShowProviderPage = () => {
  const providerId = useParam("providerId", "number");
  const [provider] = useQuery(getProvider, { id: providerId });
  const items = [
    { title: 'Providers', href: Routes.ProvidersPage() },
    { title: provider.name, href: Routes.ShowProviderPage({ providerId: provider.id }) },
  ].map((item, index) => (
    <Anchor href={item.href.pathname} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <AuthorizedLayout title="Provider details">
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <Breadcrumbs mb="xl">{items}</Breadcrumbs>
        <Suspense fallback={<div>Loading...</div>}>
          <ProviderView provider={provider} />
        </Suspense>
      </Box>
    </AuthorizedLayout>
  );
};

ShowProviderPage.authenticate = true;

export default ShowProviderPage;
