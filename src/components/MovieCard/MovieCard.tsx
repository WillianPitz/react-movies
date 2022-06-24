import { useAppContext } from "contexts/Context";
import { Check, CheckCircle, Heart, Star, Trash } from "phosphor-react";
import React, { MouseEventHandler, useState } from "react";
import { Movie } from "../../types/Movies";
import Button from "../Button/Button";
import { motion } from "framer-motion";

type MoviesProps = {
  movie: Movie;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  handleFavorite?: (e: Movie) => void;
  handleAddToCart?: (e: Movie) => void;
};

const MovieCard = ({
  movie,
  genres,
  handleFavorite,
  handleAddToCart,
}: MoviesProps) => {
  const [buttonText, setButtonText] = useState("");
  const { favorites, cart } = useAppContext();

  const showGenres = (movie: Movie) => {
    let arr: any = [];
    movie.genre_ids.map((item: any) => {
      arr.push(
        genres?.find((el: { id: number; name: string }) => el.id === item)
      );
    });

    return (
      <p className="font-normal text-gray-700 text-xs max-w-[102px] text-center">
        {arr
          .map((genre: { id: number; name: string }) => genre?.name)
          .join(", ")}
      </p>
    );
  };

  const toggleFavoriteStyles = (index: number) => {
    return favorites?.find((favorite) => favorite.id === index)
      ? "red"
      : "#FFFFFF";
  };

  const isInCart = cart?.find((item) => item.id === movie.id);

  return (
    <div className="w-[168px] flex flex-col rounded overflow-hidden shadow-lg">
      <div className="relative">
        <motion.button
          className="absolute right-1 top-1"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            data-cy="heart"
            size={22}
            color={toggleFavoriteStyles(movie.id)}
            weight="fill"
            className=""
            onClick={() => handleFavorite && handleFavorite(movie)}
          />
        </motion.button>
        <img
          className="w-full h-[176px] border-b-2 border-[#9EADBA] object-center object-cover"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.original_title}
        />
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col h-full">
          <div className="font-bold text-sm mb-2">{movie.title}</div>

          <div className="flex justify-evenly items-center pb-3">
            <div className="flex items-center gap-2 justify-center">
              <Star weight="fill" size={16} />
              <span className="font-bold text-sm">{movie.vote_average}</span>
            </div>
            {showGenres(movie)}
          </div>
          <span className="font-semibold text-xs pb-2">R$ 79,99</span>

          <motion.div
            className="flex w-full h-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              data-cy="add"
              className={`${
                isInCart
                  ? "bg-[#8DD7CF] border-[#8DD7CF] hover:border-red-500 hover:bg-red-500"
                  : ""
              }`}
              onClick={() => handleAddToCart && handleAddToCart(movie)}
            >
              {isInCart ? (
                <div
                  className="flex justify-center gap-3"
                  onMouseEnter={() => setButtonText("Remover")}
                  onMouseLeave={() => setButtonText("No carrinho")}
                >
                  {buttonText}
                  {buttonText === "No carrinho" ? (
                    <CheckCircle size={30} weight="fill" />
                  ) : (
                    <Trash size={30} weight="fill" />
                  )}
                </div>
              ) : (
                "Adicionar"
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
