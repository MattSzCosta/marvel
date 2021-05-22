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

const userLikeValidator = yup.object().shape({
  type: yup.string().required(),
  apiId: yup.string().required(),
  name: yup.string().required(),
  thumb: yup.string().required(),
  });

export default {
    userCreateValidator,
    userLikeValidator
}