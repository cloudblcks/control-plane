import { BlitzPage } from "@blitzjs/next"
import AuthorizedLayout from "app/core/layouts/AuthorizedLayout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import UnauthorizedLayout from "app/core/layouts/UnauthorizedLayout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <UnauthorizedLayout title="Log In">
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          return router.push(next)
        }}
      />
    </UnauthorizedLayout>
  )
}

export default LoginPage
