import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import Room from './pages/Room';
import NotFound from './pages/404';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Home />,
				index: true,
			},
			{
				path: '/lobby/:userId',
				element: <Lobby />,
			},
			{
				path: '/room/:roomId/',
				element: <Room />,
			},
		],
	},
]);
