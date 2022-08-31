import { Routes } from "@blitzjs/next";
import { useMutation, usePaginatedQuery } from "@blitzjs/rpc";
import { ActionIcon, Badge, Box, Button, Center, Container, Group, Table, Text, useMantineTheme } from "@mantine/core";
import { IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons";
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout";
import deleteProvider from "app/providers/mutations/deleteProvider";
import getProviders from "app/providers/queries/getProviders";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

const ITEMS_PER_PAGE = 100;

export const ProvidersList = () => {
  const router = useRouter();
  const theme = useMantineTheme();
  const page = Number(router.query.page) || 0;
  const [{ providers, hasMore }] = usePaginatedQuery(getProviders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const categoryColors = {
    database: "blue",
    serverless: "green",
    middleware: "yellow",
    paas: "cyan"
  }

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });
  const [deleteProviderMutation] = useMutation(deleteProvider);
  return (
    <Container>
      <Table verticalSpacing="lg">
        <thead>
          <tr>
            <th><Text>Name</Text></th>
            <th><Text>Category</Text></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td><Text>{provider.name}</Text></td>
              <td>
                <Badge
                  color={categoryColors[provider.category.toLowerCase()]}
                  variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                >
                  {provider.category}
                </Badge>
              </td>
              <td>
                <Group spacing={2} position="right">
                  <Link href={Routes.ShowProviderPage({ providerId: provider.id })}>
                    <ActionIcon color="blue">
                      <IconInfoCircle size={20} stroke={1.5} />
                    </ActionIcon>
                  </Link>
                  <Link href={Routes.EditProviderPage({ providerId: provider.id })}>
                    <ActionIcon>
                      <IconPencil size={20} stroke={1.5} />
                    </ActionIcon>
                  </Link>
                  <ActionIcon color="red" onClick={async () => {
                    if (window.confirm("Provider " + provider.name + " will be deleted. Are you sure?")) {
                      await deleteProviderMutation({ id: provider.id });
                      void router.push(Routes.ProvidersPage());
                    }
                  }}>
                    <IconTrash size={20} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Group position="apart">
        <Group position="left">
          <Button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </Button>
          <Button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </Button>
        </Group>
        <Link href={Routes.NewProviderPage()}>
          <Button component="a">Create New Provider</Button>
        </Link>
      </Group>
    </Container>
  );
};

const ProvidersPage = () => {
  return (
    <AuthorizedLayout title="Providers">
      <Head>
        <title>Providers</title>
      </Head>

      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <Suspense fallback={<Center><Text>Loading...</Text></Center>}>
          <ProvidersList />
        </Suspense>
      </Box>
    </AuthorizedLayout>
  );
};

export default ProvidersPage;
