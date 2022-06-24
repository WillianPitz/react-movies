import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Modal from "components/Modal/Modal";
import { Tooltip } from "components/Tooltip/Tooltip";
import { useAppContext } from "contexts/Context";
import { Formik, FormikProps, FormikValues } from "formik";
import { Trash } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutSchema } from "schemas";

const Checkout = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { cart, setCart, handleAddToCart, sumTotalMoviesPrices } =
    useAppContext();

  const navigate = useNavigate();

  const handleSubmit = (values: FormikValues) => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-evenly p-4 pt-10 gap-[10%]">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold text-slate-600">Finalizar</h1>
        <Formik
          initialValues={{
            name: "",
            cpf: "",
            phone: "",
            email: "",
            cep: "",
            address: "",
            city: "",
            state: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          enableReinitialize
          validationSchema={CheckoutSchema}
        >
          {({
            handleSubmit,
            values,
            handleChange,
            errors,
            touched,
          }: FormikProps<any>) => (
            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6 max-w-[376px]">
                <Input
                  name="name"
                  placeholder="Nome Completo"
                  onChange={handleChange}
                />
                <div className="flex gap-5">
                  <Input
                    name="cpf"
                    placeholder="CPF"
                    className="w-[178px]"
                    onChange={handleChange}
                    mask="999.999.999-99"
                  />

                  <Input
                    name="phone"
                    placeholder="Celular"
                    className="w-[178px]"
                    onChange={handleChange}
                    mask="(99) 99999-9999"
                  />
                </div>
                <Input
                  name="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                />
                <div className="flex gap-5">
                  <Input
                    name="cep"
                    placeholder="CEP"
                    className="w-[112px]"
                    onChange={handleChange}
                    mask="99999-999"
                  />
                  <Input
                    name="address"
                    placeholder="Endereço"
                    className="w-[245px]"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-5">
                  <Input
                    name="city"
                    placeholder="Cidade"
                    className="w-[178px]"
                    onChange={handleChange}
                  />
                  <Input
                    name="state"
                    placeholder="Estado"
                    className="w-[178px]"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {isOpen && (
                <Modal
                  name={values.name}
                  isOpen={isOpen}
                  closeModal={() => setIsOpen(false)}
                  onClickSubmitModal={() => {
                    setCart([]);
                    navigate("/");
                  }}
                />
              )}
            </form>
          )}
        </Formik>
      </div>

      <div className="flex flex-col mt-10">
        <table className="table-auto md:w-[420px] text-sm text-slate-600">
          <thead className="border-[10px] border-[#fff]">
            <tr>
              <th className="text-left">Imagem</th>
              <th className="text-left">Nome</th>
              <th>Qtd</th>
              <th className="text-left">Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((movie, index) => (
              <tr
                key={index}
                className="border-b-2 border-slate-400 font-medium"
              >
                <td className="pb-2 pt-2 w-24">
                  <div>
                    <img
                      className="w-[68px] h-[60px] rounded-sm object-center object-cover"
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                  </div>
                </td>
                <td className="max-w-[125px] truncate">{movie.title}</td>
                <td className="text-center w-20">1</td>
                <td>{movie.price}</td>
                <td>
                  <div>
                    <Tooltip tooltipMessage="Remover do carrinho">
                      <Trash
                        className="cursor-pointer"
                        onClick={() => handleAddToCart(movie)}
                        size={20}
                        weight="fill"
                        color="#4B5C6B"
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-1 pt-6">
          <span className="font-medium text-slate-600 text-base">Total:</span>
          <h1 className="font-semibold text-2xl text-slate-700">
            {sumTotalMoviesPrices.toFixed(2)}
          </h1>
        </div>

        <Button form="checkout-form" type="submit" className="mt-10">
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
