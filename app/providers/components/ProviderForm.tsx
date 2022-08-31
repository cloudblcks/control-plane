import { Button, Container, Group, Paper, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export function ProviderForm(props: {
  onSubmit: (values: { name: string, category: string }) => void,
  initialValues?: { name: string, category: string },
  submitLabel: string,
}) {
  const form = useForm({
    initialValues: props.initialValues ? props.initialValues : { name: "", category: "" }
  });
  return (
    <form onSubmit={form.onSubmit(async (values) => { props.onSubmit(values) })}>
      <Container size={420} my={40}>
        <Text align="center" size="xl">
          Details of the new provider
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Name" placeholder="Provider Name" required {...form.getInputProps('name')} />
          <TextInput label="Category" placeholder="Category" required mt="md" {...form.getInputProps('category')} />
          <Group position="center" grow>
            <Button mt="lg" type="submit">
              {props.submitLabel}
            </Button>
            <Button mt="lg" variant="outline">
              Cancel
            </Button>
          </Group>

        </Paper>
      </Container>
    </form>
  );
}
