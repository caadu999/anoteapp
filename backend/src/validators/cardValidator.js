import { z } from "zod";

const cardSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(20, "Título muito longo"),
  description: z
    .string()
    .min(1, "Descrição obrigatória")
    .max(200, "Descrição muito longa"),
  color: z
    .string()
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Cor inválida")
    .optional(),
});

export default cardSchema;
