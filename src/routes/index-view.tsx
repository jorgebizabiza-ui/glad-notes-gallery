import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/index-view")({
  beforeLoad: () => { throw redirect({ to: "/", replace: true }); },
});
