import ReactDOM from 'react-dom/client';
import SocketProvider from './socketContext.tsx';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import './style/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SocketProvider>
		<RouterProvider router={router} />
	</SocketProvider>
);
