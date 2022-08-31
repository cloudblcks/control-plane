import { useRouter } from "next/router"
import { SignupForm } from "app/auth/components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"
import UnauthorizedLayout from "app/core/layouts/UnauthorizedLayout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <UnauthorizedLayout title="Sign Up">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </UnauthorizedLayout>
  )
}

export default SignupPage
