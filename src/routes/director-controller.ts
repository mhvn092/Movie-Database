import express from "express";
import { DirectorEntity } from "../entities/director-entity";
import { DirectorService } from "../services/director-service";
import { GenreService } from "../services/genre-service";
import { MovieService } from "../services/movie-service";

const router = express.Router();

const directorService = new DirectorService();
const movieService = new MovieService();
const genreservice = new GenreService();
router.post("/", async (req, res) => {
  const { name } = req.body;

  const movie = new DirectorEntity();
  movie.name = name;
  await directorService.insert(movie);

  return res.json(movie);
});

router.get("/", async (req, res) => {
  const { page, count } = req.query;
  const movies = await directorService.findAll(
    parseInt(page as string),
    parseInt(count as string)
  );
  return res.json(movies);
});

router.put("/:directorId/new-movie/:movieId", async (req, res) => {
    const { movieId, directorId } = req.params;
  
    const movie = await movieService.find(parseInt(movieId));
  
    console.log(`director before addind new movie`, movie);
    if (!movie) {
      res.status(404).send("movie nor found");
    }
  
    const director = await directorService.find(parseInt(directorId));
  
    if (!director) {
      res.status(404).send("directornor found");
    }
  
    const updatedmovie = await directorService.addMovie(movie, director);
  
    return res.json(updatedmovie);
  });
  
  router.put("/:directorId/new-genre/:genreId", async (req, res) => {
    const { directorId, genreId } = req.params;
  
    const director = await directorService.find(parseInt(directorId));
  
    console.log(`director before addind new genre`, director);
    if (!director) {
      res.status(404).send("director nor found");
    }
  
    const genre = await genreservice.find(parseInt(genreId));
  
    if (!genre) {
      res.status(404).send("genre nor found");
    }
  
    const updatedmovie = await directorService.addGenre(director, genre);
  
    return res.json(updatedmovie);
  });
  

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await directorService.find(parseInt(id));
      if (!movie) {
        return res.status(404).send("director not found");
      }
      await movieService.delete(parseInt(id));
      return res.json(movie);
    } catch (e) {
      return res.status(500).send(`Error: ${e}`);
    }
  });

export { router as DirectorController };
