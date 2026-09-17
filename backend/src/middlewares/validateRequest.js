import zod from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formated = result.error.format();

      const flatErrors = Object.values(formated)
        .flat()
        .filter(Boolean)
        .map((e) => e._errors)
        .flat();

      return res.status(400).json({ message: flatErrors.join(",  ") });
    }
    next();
  };
};