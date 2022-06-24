import Navbar from "components/Navbar/Navbar";
import useLocalStorage from "hooks/useLocalStorage";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Movie } from "types/Movies";
export type AppContextData = {
  searchMovies?: string;
  setSearchMovies: React.Dispatch<React.SetStateAction<string>>;
  favorites?: Movie[];
  setFavorites: React.Dispatch<React.SetStateAction<any>>;
  cart?: Movie[];
  setCart: React.Dispatch<React.SetStateAction<any>>;
  isCartOpen?: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFavoritesOpen?: boolean;
  setIsFavoritesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddToCart: (movie: Movie) => void;
  sumTotalMoviesPrices: number;
};
export const AppContext = createContext<AppContextData>({} as AppContextData);

type AppProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProps) => {
  const [searchMovies, setSearchMovies] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const item = localStorage.getItem("cart");
    return item ? JSON.parse(item) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const item = localStorage.getItem("favorites");
    return item ? JSON.parse(item) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [favorites, cart]);

  const sumTotalMoviesPrices = cart?.reduce((accumulator: any, object: any) => {
    return accumulator + object?.price;
  }, 0);

  const handleOpenCart = () => {
    if (isFavoritesOpen === false) {
      setIsCartOpen(!isCartOpen);
    } else {
      setIsFavoritesOpen(!isFavoritesOpen);
      setIsCartOpen(!isCartOpen);
    }
  };

  const handleOpenFavorites = () => {
    if (isCartOpen === false) {
      setIsFavoritesOpen(!isFavoritesOpen);
    } else {
      setIsCartOpen(!isCartOpen);
      setIsFavoritesOpen(!isFavoritesOpen);
    }
  };

  const handleAddToCart = (movie: Movie) => {
    if (!cart?.find((cart: Movie) => cart.id === movie.id)) {
      setCart((cart: any) => [...cart, { ...movie, price: 79.99 }]);
    } else {
      setCart(cart.filter((cart: Movie) => cart.id !== movie.id));
    }
  };

  return (
    <AppContext.Provider
      value={{
        searchMovies,
        setSearchMovies,
        favorites,
        setFavorites,
        cart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        isFavoritesOpen,
        setIsFavoritesOpen,
        handleAddToCart,
        sumTotalMoviesPrices,
      }}
    >
      <>
        <Navbar
          onChange={(e) => {
            setSearchMovies(e.target.value);
          }}
          itemsInCart={cart.length}
          onClickCart={() => handleOpenCart()}
          onClickHeart={() => handleOpenFavorites()}
        />
        {children}
      </>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};
