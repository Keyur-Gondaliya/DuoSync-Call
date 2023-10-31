import { z } from "zod";

export const UserInput = z.object({
  email: z.string().min(2),
  password: z.string(),
});
