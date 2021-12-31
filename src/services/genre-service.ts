import { GenreEntity } from "../entities/genre-entity";

export class GenreService {
    public async find(id: number) {
        const actor = await GenreEntity.findOne(id, 
        );
        return actor;
      }
}