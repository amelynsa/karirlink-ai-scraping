import { z } from "zod";

const jobSchema = z.object({
  title: z.string().optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  salary: z.xor([
    z.object({
      type: z
        .literal("fixed")
        .describe(
          "Fixed salary amount, may represent hourly, daily, monthly or yearly salary."
        ),
      amount: z.number(),
    }),
    z.object({
      type: z.literal("range"),
      min: z.number(),
      max: z.number(),
    }),
    z.object({
      type: z.literal("not specified"),
    }),
  ]),
  job_type: z
    .enum(["full-time", "part-time", "contract", "internship", "not specified"])
    .default("not specified"),
  description: z
    .string()
    .optional()
    .describe(
      "Detailed description of the job, including responsibilities and requirements."
    ),
  posting_date: z.string().optional(),
  end_date: z.string().optional(),
  url: z.url().optional().describe("The URL of the job listing."),
});

export const jsonSchema = z.toJSONSchema(z.array(jobSchema));
