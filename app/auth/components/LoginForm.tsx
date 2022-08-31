import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { Container, Title, Text, Anchor, Paper, TextInput, PasswordInput, Group, Checkbox, Button } from "@mantine/core"
import { useForm } from "@mantine/form"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (

    <form onSubmit={form.onSubmit(async (values) => {
      try {
        const user = await loginMutation(values)
        props.onSuccess?.(user)
      } catch (error: any) {
        if (error instanceof AuthenticationError) {
          return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
        } else {
          return {
            [FORM_ERROR]:
              "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
          }
        }
      }
    })}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Link href={Routes.SignupPage()}>
            <Anchor<'a'> size="sm">
              Create account
            </Anchor>
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@cloudblocks.dev" required {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
          <Group position="apart" mt="md">
            {/* <Checkbox label="Remember me" /> */}
            <Link href={Routes.ForgotPasswordPage()}>
              <Anchor<'a'> size="sm">
                Forgot password?
              </Anchor>
            </Link>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </Container>
    </form>

  )
}

export default LoginForm
