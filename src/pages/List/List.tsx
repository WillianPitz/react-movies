import { useAppContext } from "contexts/Context";
import { CircleNotch } from "phosphor-react";
import React from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import CustomInfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import MovieCard from "../../components/MovieCard/MovieCard";
import { ListService } from "../../services";
import { Movie } from "../../types/Movies";
import Cart from "./Cart/Cart";
import Favorites from "./Favorites/Favorites";

const List: React.FC = () => {
  const { searchMovies, favorites, setFavorites, handleAddToCart } =
    useAppContext();

  const fallbackData = { data: {} } as any;

  const getMoviesKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data.results.length) return null;
    return [
      `/movie/popular`,
      {
        params: {
          page: pageIndex + 1,
          size: 10,
        },
      },
    ];
  };

  const swrMovies: any = useSWRInfinite<any>(
    getMoviesKey,
    ListService.getMovies,
    {
      initialSize: 1,
      persistSize: true,
      fallbackData: [],
    }
  );

  let moviesContent = [];

  if (!swrMovies?.data?.[0]?.id) {
    moviesContent = swrMovies.data.flatMap((targetContent: any) =>
      targetContent.data.results.map((client: any) => client)
    );
  } else {
    moviesContent = swrMovies.data;
  }

  const swrMoviesGenres = useSWR(`/genre/movie/list`, ListService.getMovies, {
    fallbackData,
    revalidateOnFocus: false,
  });

  const { genres } = swrMoviesGenres.data.data;

  const filteredOptions = moviesContent?.filter((movie: Movie) =>
    movie.title.toLowerCase().includes(searchMovies!.toLowerCase())
  );

  const handleFavorite = (movie: Movie) => {
    if (!favorites?.find((favorites) => favorites.id === movie.id)) {
      setFavorites((favorites: any) => [
        ...favorites,
        { ...movie, price: 79.99 },
      ]);
    } else {
      setFavorites(favorites.filter((favorite) => favorite.id !== movie.id));
    }
  };

  return (
    <div>
      <CustomInfiniteScroll
        onLoad={() => swrMovies.setSize(swrMovies.size + 1)}
        variant="customInfiniteScroll"
      >
        <div className="w-full h-[calc(100vh-180px)] flex flex-wrap gap-20 justify-center text-center m-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((movie: Movie, index: number) => {
              return (
                <MovieCard
                  movie={movie}
                  genres={genres}
                  key={index}
                  handleFavorite={(e: any) => handleFavorite(e)}
                  handleAddToCart={(e: any) => handleAddToCart(e)}
                />
              );
            })
          ) : (
            <div className="flex justify-center">
              Nenhum resultado para: <p className="font-bold">{searchMovies}</p>
            </div>
          )}
        </div>
        {swrMovies.isValidating && swrMovies.size > 1 && (
          <div className="flex justify-center absolute right-0 left-0 bottom-5">
            <CircleNotch
              size={28}
              color="#312b2b"
              weight="light"
              className="animate-spin"
            />
          </div>
        )}
        <Cart handleDelete={(item) => handleAddToCart(item)} />

        <Favorites
          handleDelete={(item) => handleFavorite(item)}
          handleAddToCart={(item) => handleAddToCart(item)}
        />
      </CustomInfiniteScroll>
    </div>
  );
};

export default List;
