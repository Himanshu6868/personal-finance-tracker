import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "./form-message";
import { SubmitButton } from "./submit-button";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">Don&apos;t have an account? </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in with Google :)
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
