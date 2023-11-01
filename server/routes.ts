import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/api/register",
    controller: UserController,
    action: "register"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "post",
    route: "/api/login",
    controller: AuthController,
    action: "login"
}];
