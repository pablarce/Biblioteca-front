import { RouteProps } from "react-router"
import Paths from "./paths"

// Importa tus componentes aquí
import Login from "../pages/Login"
import Home from "../pages/Home"

interface RouteGroups {
    public: RouteProps[]
    private: RouteProps[]
}

const routes: RouteGroups = {
    public: [
        {
            path: Paths.LOGIN,
            element: <Login />
        }
    ],
    private: [
        {
            path: Paths.HOME,
            element: <Home />
        }
    ]
}

export default routes
