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
    password: yup
      .string()
      .required("⚠ This field is required")
      .min(6, "⚠ Min length is 6"),
    confirmPassword: yup
      .string()
      .required("⚠ This field is required")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();
