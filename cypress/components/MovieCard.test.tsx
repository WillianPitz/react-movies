import { mount } from "cypress/react";
import MovieCard from "components/MovieCard/MovieCard";

const movie = {
  adult: false,
  backdrop_path: "/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
  genre_ids: [14, 28, 12],
  id: 453395,
  original_language: "en",
  original_title: "Doctor Strange in the Multiverse of Madness",
  overview:
    "Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.",
  popularity: 5462.157,
  poster_path: "/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
  release_date: "2022-05-04",
  title: "Doctor Strange in the Multiverse of Madness",
  video: false,
  vote_average: 7.5,
  vote_count: 2698,
};
it("MovieCard component", () => {
  const handleAddToCart = cy.spy();
  const handleFavorite = cy.spy();
  mount(
    <MovieCard
      handleAddToCart={handleAddToCart}
      handleFavorite={handleFavorite}
      movie={movie}
      genres={[
        {
          id: 28,
          name: "Action",
        },
      ]}
    />
  );

  cy.findByText("Doctor Strange in the Multiverse of Madness");
  cy.findByText("7.5");
  cy.findByText("R$ 79,99");

  cy.findByText("Adicionar")
    .click()
    .then(() => {
      expect(handleAddToCart).to.called;
    });

  cy.get("button")
    .first()
    .click()
    .then(() => {
      expect(handleFavorite).to.called;
    });
});
