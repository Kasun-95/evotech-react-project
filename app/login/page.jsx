import LoginForm from "./login-form";

// Server component for server side rendering
export default function LoginPage() {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen text-black"
      style={{ backgroundColor: "white" }}
    >
      <LoginForm title="Sign in to MFlix" />
    </div>
  );
}
