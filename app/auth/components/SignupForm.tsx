
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import { Container, Title, Text, Anchor, Paper, TextInput, PasswordInput, Group, Button } from "@mantine/core"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
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
        await signupMutation(values)
        props.onSuccess?.()
      } catch (error: any) {
        if (error.code === "P2002" && error.meta?.target?.includes("email")) {
          // This error comes from Prisma
          return { email: "This email is already being used" }
        } else {
          return { [FORM_ERROR]: error.toString() }
        }
      }
    })}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome to Cloudblocks!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Link href={Routes.LoginPage()}>
            <Anchor<'a'> size="sm">
              Sign In
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
            Sign up
          </Button>
        </Paper>
      </Container>
    </form>

  )
}

export default SignupForm
