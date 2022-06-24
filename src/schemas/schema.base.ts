import * as Yup from "yup";

const error = "Este campo é obrigatório";
Yup.setLocale({
  mixed: {
    notType: error,
    default: error,
    required: error,
  },
  string: {
    email: "E-mail inválido",
  },
});
