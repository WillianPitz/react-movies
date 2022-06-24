import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import MovieCard from "components/MovieCard/MovieCard";
import Sidebar from "components/Sidebar/Sidebar";
import { Tooltip } from "components/Tooltip/Tooltip";
import { useAppContext } from "contexts/Context";
import { Trash } from "phosphor-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "types/Movies";

type CartProps = {
  handleDelete: (movie: Movie) => void;
};

const Cart = ({ handleDelete }: CartProps) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isCartOpen, setIsCartOpen, cart, setCart, sumTotalMoviesPrices } =
    useAppContext();

  const handleClickSubmit = () => {
    if (cart?.length === 0) {
      setIsOpenModal(true);
    } else {
      navigate("/checkout");
      setIsCartOpen(false);
    }
  };

  return (
    <Sidebar
      setIsOpen={setIsCartOpen}
      isOpen={isCartOpen}
      title="Meu Carrinho"
      onClickEmpty={() => setCart([])}
    >
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {cart?.map((cart) => (
          <li key={cart.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={`https://image.tmdb.org/t/p/w300${cart.poster_path}`}
                alt={cart.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex items-center ml-2 gap-5 w-full justify-between">
              <p className="w-[120px] truncate ml-2">{cart.title}</p>
              <p>1</p>
              <p>R$ {cart.price}</p>
              <Tooltip tooltipMessage="Remover do carrinho">
                <Trash
                  data-tip="Remover do carrinho"
                  size={16}
                  weight="fill"
                  color="#4B5C6B"
                  className="cursor-pointer"
                  onClick={() => handleDelete(cart)}
                />
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex h-full">
        <div className="flex flex-col w-full self-end">
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="font-bold text-lg">
              {`R$ ${sumTotalMoviesPrices?.toFixed(2)}`}
            </span>
          </div>
          <div className="flex mt-4">
            <Button onClick={() => handleClickSubmit()}>
              Finalizar compra
            </Button>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          closeModal={() => setIsOpenModal(false)}
          isOpen={isOpenModal}
          onClickSubmitModal={() => setIsOpenModal(false)}
          errorMessage="Nenhum item adicionado ao carrinho!"
        />
      )}
    </Sidebar>
  );
};

export default Cart;
