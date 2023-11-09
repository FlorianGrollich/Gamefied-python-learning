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
        const newGrid = new Grid();
        newGrid.grid = grid;
        await this.gridRepository.save(newGrid).catch((err) => {
            return response.status(400).json({error: err});
        });

        return response.status(200).json({message: "Grid created successfully"});

    }

    async initialGrid(request: Request, response: Response, next: NextFunction) {
        //const grid = await this.gridRepository.findOneBy({id: 1});
        return response.status(200).json([
            ["", "", "", "", "", "", "", "", "P", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ]);
    }


}