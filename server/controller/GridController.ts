import {Grid} from "../entity/Grid";
import {PostgresDataSource} from "../utils/data-source";
import {NextFunction} from "express";


export class GridController {

    private gridRepository = PostgresDataSource.getRepository(Grid);

    constructor() {
    }

    async initialGrid(request: Request, response: Response, next: NextFunction) {
        const grid = await this.gridRepository.findOneBy({id: 1});
        return grid
    }


}