import { createRootRoute, createRoute } from "@tanstack/react-router";
import App from "../App";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Login from "@/pages/Auth/Login";
import UserCart from "@/pages/User/UserCart";

const rootRoute = createRootRoute({
    component: App,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: Login
});

const userCartRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/cart",
    component: UserCart,
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    userCartRoute,
]);