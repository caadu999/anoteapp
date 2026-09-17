import { z } from "zod";

const authSchema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(20, "Nome muito longo"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha muito curta").max(20, "Senha muito longa"),
});

export default authSchema;
