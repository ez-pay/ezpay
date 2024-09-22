import { FaGoogle } from "react-icons/fa";
import { signIn, signOut } from "auth";
import { Button } from "./button";

export default function GoogleButton({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"; // This ensures the code runs on the server.
        await signIn(provider); // Server-side sign-in logic.
      }}
    >
      <button
        className="icon-button"
        style={{
          borderRadius: "20px",
          background: "rgb(219, 68, 55)",
          width: "40px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FaGoogle
          className="icon"
          style={{
            alignItems: "center",
            color: "white",
            width: "20px",
            height: "20px",
          }}
        />
      </button>
    </form>
  );
}
