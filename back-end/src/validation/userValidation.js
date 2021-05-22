import yup from "./yup"

const userCreateValidator = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup.string().required()
  });

export default {
    userCreateValidator
}