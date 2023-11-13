import {UserController} from "./controller/UserController";
import {AuthController} from "./controller/AuthController";
import {GridController} from "./controller/GridController";

export const Routes = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/users/:id',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/register',
    controller: UserController,
    action: 'register',
  },
  {
    method: 'delete',
    route: '/users/:id',
    controller: UserController,
    action: 'remove',
  },
  {
    method: 'post',
    route: '/api/login',
    controller: AuthController,
    action: "login"
  },
  {
    method: "get",
    route: "/api/grid/initial",
    controller: GridController,
    action: "initialGrid"
  },
  {
    method: "post",
    route: "/api/grid/create",
    controller: GridController,
    action: "createNewGrid"
  }
];
