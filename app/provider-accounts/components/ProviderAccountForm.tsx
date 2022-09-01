import { Button, Container, Group, Paper, Select, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";


export function ProviderAccountForm(
  props: {
    onSubmit: (values: { name: string, provider_id: string, credentials: string }) => void,
    initialValues?: { name: string, provider_id: string, credentials: string },
    submitLabel: string,
    options: Array<{ label: string, value: string }>
  }) {
  const form = useForm({
    initialValues: props.initialValues ? props.initialValues : { name: "", provider_id: "", credentials: "" }
  })
  const router = useRouter();
  return (

    <form onSubmit={form.onSubmit(async (values) => { props.onSubmit(values) })}>
      <Container size={420} my={40}>
        <Text align="center" size="xl">
          Details of the new account
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Name" placeholder="Account Name" required {...form.getInputProps('name')} />
          <Select
            label="Provider"
            placeholder="Pick one"
            data={props.options}
            {...form.getInputProps('provider_id')}
          />
          <Textarea
            placeholder="credentials"
            label="Credentials"
            required
            {...form.getInputProps('credentials')}
          />
          <Group position="center" grow>
            <Button mt="lg" type="submit">
              {props.submitLabel}
            </Button>
            <Button mt="lg" variant="outline" onClick={() => { router.back() }}>
              Cancel
            </Button>
          </Group>
        </Paper>
      </Container>
    </form >
  );
}
