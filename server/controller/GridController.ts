import {Grid} from "../entity/Grid";
import {PostgresDataSource} from "../utils/data-source";
import {Response, Request, NextFunction} from "express";


export class GridController {

    private gridRepository = PostgresDataSource.getRepository(Grid);

    constructor() {
        this.createNewGrid = this.createNewGrid.bind(this);
        this.initialGrid = this.initialGrid.bind(this);
    }

    async createNewGrid(request: Request, response: Response, next: NextFunction) {
        const {grid} = request.body;
        if (grid === undefined || grid === null) {
            return response.status(400).json({error: "Grid data is missing or null"});
        }

        try {
            const newGrid = new Grid();
            newGrid.grid = grid;
            await this.gridRepository.save(newGrid);
            return response.status(200).json({message: "Grid created successfully"});
        } catch (err) {
            return response.status(400).json({error: err});
        }
    }

    async initialGrid(request: Request, response: Response, next: NextFunction) {
        const grid = await this.gridRepository.findOneBy({id: 2});
        return response.status(200).json(grid!.grid);
    }


}