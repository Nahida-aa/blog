import SignupForm from "../_comp/signupForm";
import { Button } from "@/components/ui/button";
import GitHubIcon from "@/components/svg/github";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import GithubAuthButton from "@/components/auth/Button"

export default function Client() {
  return (
    <Card
      className="border-none"
    >
      <CardContent className="flex flex-col items-center justify-center p-4 w-64">
        <SignupForm />

        <div className="flex items-center justify-between my-4 w-full">
          <hr className="w-5/12 border-gray-300" />
          <span className="text-gray-500">or</span>
          <hr className="w-5/12 border-gray-300" />
        </div>
        <GithubAuthButton />
      </CardContent>

    </Card>
  );
}