import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './views/Home';
import Lobby from './views/Lobby';
import Room from './views/Room';
import NotFound from './views/404';

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
