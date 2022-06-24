import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Sidebar from "components/Sidebar/Sidebar";
import { Tooltip } from "components/Tooltip/Tooltip";
import { useAppContext } from "contexts/Context";
import { ShoppingCart, Trash } from "phosphor-react";
import React, { useState } from "react";
import { Movie } from "types/Movies";

type FavoritesProps = {
  handleDelete: (movie: Movie) => void;
  handleAddToCart: (movie: Movie) => void;
};

const Favorites = ({ handleDelete, handleAddToCart }: FavoritesProps) => {
  const [isOpenModals, setIsOpenModals] = useState(false);

  const { favorites, setFavorites, isFavoritesOpen, setIsFavoritesOpen } =
    useAppContext();

  const handleClickCart = (item: Movie) => {
    if (favorites?.find((favorites: Movie) => favorites.id === item.id)) {
      setIsOpenModals(true);
    } else {
      handleAddToCart(item);
    }
  };

  return (
    <Sidebar
      isOpen={isFavoritesOpen}
      setIsOpen={setIsFavoritesOpen}
      title="Meus Favoritos"
      onClickEmpty={() => setFavorites([])}
    >
      <ul role="list" className="-my-6 divide-y divide-gray-200">
        {favorites?.map((favorites) => (
          <li key={favorites.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={`https://image.tmdb.org/t/p/w300${favorites.poster_path}`}
                alt={favorites.title}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex items-center ml-2 gap-5 w-full justify-between">
              <p className="w-[120px] truncate ml-2">{favorites.title}</p>
              <p>R$ {favorites.price}</p>

              <Tooltip tooltipMessage="Adicionar ao carrinho">
                <ShoppingCart
                  className="cursor-pointer"
                  size={20}
                  weight="fill"
                  color="#1AAE9F"
                  onClick={() => handleClickCart(favorites)}
                />
              </Tooltip>

              <Tooltip tooltipMessage="Remover do carrinho">
                <Trash
                  data-tip="Remover do carrinho"
                  size={16}
                  weight="fill"
                  color="#4B5C6B"
                  className="cursor-pointer"
                  onClick={() => handleDelete(favorites)}
                />
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
      {isOpenModals && (
        <Modal
          closeModal={() => setIsOpenModals(false)}
          isOpen={isOpenModals}
          onClickSubmitModal={() => setIsOpenModals(false)}
          errorMessage="Esse item já está no carrinho!"
        />
      )}
    </Sidebar>
  );
};

export default Favorites;
