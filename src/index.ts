import { createConnection } from "typeorm";
import express from "express";
import { MovieEntity } from "./entities/movie-entity";
import { GenreEntity } from "./entities/genre-entity";
import { DirectorEntity } from "./entities/director-entity";
import { ActorController } from "./routes/actor-controller";
import { DirectorController } from "./routes/director-controller";
import { MovieController } from "./routes/movie-controller";
import { ActorEntity } from "./entities/actor-Entity";

const app = express();

async function main() {
  try {
    await createConnection({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123",
      extra: {
        trustServerCertificate: true,
      },
      database: "typeorm",
      synchronize: true,
      entities: [ActorEntity,MovieEntity,GenreEntity,DirectorEntity],
    });

    console.log("database connected");
    app.use(express.json());
    app.use("/api/movie/",MovieController);
    app.use("/api/director/",DirectorController );
    app.use('/api/actor/',ActorController)

    app.listen(3000, () => console.log("Listening on port 3000"));
  } catch (e: any) {
    console.error(e);
    console.log("connection error");
  }
}

main();
