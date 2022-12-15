import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string()
    .required("Email is required.")
    .email("Invalid email address. Please re-enter."),

  password: Yup.string()
    .required("Password is required")
    .min(7, "Password must be between 7 to 15 characters")
    .max(15, "Password must be between 7 to 15 characters")
    // .max(5, 'Password must be less than 5')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/,
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),

  // confirmPassword: Yup.string()
  //   .required("Please re-enter password")
  //   .oneOf([Yup.ref("password")], "Your passwords do not match."),
});
