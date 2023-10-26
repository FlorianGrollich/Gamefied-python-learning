import { Request, Response, NextFunction } from 'express';
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: (req: Request, res: Response <any>, next: NextFunction) => {
        const result = new UserController().all(req, res, next);
        if (result instanceof Promise) {
            result.then(data => data !== null && data !== undefined ? res.send(data) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    }
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: (req: Request, res: Response <any>, next: NextFunction) => {
        const result = new UserController().one(req, res, next);
        if (result instanceof Promise) {
            result.then(data => data !== null && data !== undefined ? res.send(data) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    }
}, {
    method: "post",
    route: "/api/register",
    controller: UserController,
    action: (req: Request, res: Response <any>, next: NextFunction) => {
        const result = new UserController().register(req, res, next);
        if (result instanceof Promise) {
            result.then(data => data !== null && data !== undefined ? res.send(data) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    }
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: (req: Request, res: Response <any>, next: NextFunction) => {
        const result = new UserController().remove(req, res, next);
        if (result instanceof Promise) {
            result.then(data => data !== null && data !== undefined ? res.send(data) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    }
}, {
    method: "post",
    route: "/api/login",
    controller: AuthController,
    action: (req: Request, res: Response <any>, next: NextFunction) => {
        const result = new AuthController().login(req, res, next);
        if (result instanceof Promise) {
            result.then(data => data !== null && data !== undefined ? res.send(data) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    }
}];
