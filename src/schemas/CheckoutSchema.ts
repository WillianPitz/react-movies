import * as yup from "yup";

export const CheckoutSchema = yup.object().shape({
  name: yup.string().required(),
  cpf: yup.string(),
  phone: yup.string(),
  email: yup.string().email(),
  cep: yup.string(),
  address: yup.string(),
  city: yup.string(),
  state: yup.string(),
});
