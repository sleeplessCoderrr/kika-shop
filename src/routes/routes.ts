import { createRootRoute, createRoute } from "@tanstack/react-router";
import AdminDashboard from "@/pages/Admin/AdminDashboard"; 
import Dashboard from "@/pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./ProtectedRoutes";
import UserCart from "@/pages/User/UserCart";
import Login from "@/pages/Auth/Login";
import App from "../App";

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

const adminDashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin",
    component: () => ProtectedRoute({ children: AdminDashboard() }),
});

export const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    userCartRoute,
    adminDashboardRoute,
]);