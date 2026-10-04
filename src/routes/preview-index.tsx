import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/preview-index")({
  beforeLoad: () => { throw redirect({ to: "/", replace: true }); },
});
