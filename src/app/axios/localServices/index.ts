import Services from "../services";

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await Services.localService.post("/api/register", {
    email,
    password,
  });
}
