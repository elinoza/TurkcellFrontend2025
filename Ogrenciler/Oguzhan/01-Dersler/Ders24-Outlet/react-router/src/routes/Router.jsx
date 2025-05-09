import { useRoutes } from 'react-router'
import HomeView from '../views/HomeView'
import UserRouter from './UserRouter'
import ParametreView from '../views/ParametreView'

const Router = () => {
    const routes = useRoutes([
        { path: '/', element: <HomeView /> },
        UserRouter,
        { path: '/parametre/:id', element: <ParametreView /> },
    ])
    return routes
}

export default Router
