// ========================== yup ==========================
import * as yup from "yup";

export const formSchema = yup
  .object({
    firstname: yup.string().required("⚠ This field is required"),
    lastname: yup.string().required("⚠ This field is required"),
    email: yup
      .string()
      .required("⚠ This field is required")
      .email("⚠ Entered value does not match email format"),
    tag: yup
      .string()
      .required("⚠ This field is required")
      .min(4, "⚠ Min length is 4"),
  })
  .required();
