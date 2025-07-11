import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MovieList,
});

const movieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/$movieId',
  component: MovieDetails,
});

const routeTree = rootRoute.addChildren([indexRoute, movieRoute]);

export const router = createRouter({ routeTree });