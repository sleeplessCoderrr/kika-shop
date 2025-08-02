import { createRootRoute, createRoute } from "@tanstack/react-router";
import App from "../App";
import Dashboard from "@/pages/Dashboard/Dashboard";

const rootRoute = createRootRoute({
    component: App,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Dashboard,
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
]);