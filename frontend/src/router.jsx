import { createBrowserRouter } from "react-router-dom";

import {Layout} from "./pages/Layout";
import {Blockchain} from "./pages/Blockchain";
//import {Transaction} from "./pages/Transaction";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import HandleTransaction from "./components/HandleTransaction";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

        children: [
            {
                path: "/blockchain",
                element:  <Blockchain />,
            },
            {
                path: "/transaction",
                element:(
                    <PrivateRoute>
                        <HandleTransaction />
                    </PrivateRoute>
                ),
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    }
]);
