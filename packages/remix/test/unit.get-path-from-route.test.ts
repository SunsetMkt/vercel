import { getPathFromRoute } from '../src/utils';
import type { RouteManifest } from '@remix-run/dev/dist/config/routes';

describe('getPathFromRoute()', () => {
  const routes: RouteManifest = {
    root: { path: '', id: 'root', file: 'root.tsx' },
    'routes/__pathless': {
      path: undefined,
      id: 'routes/__pathless',
      parentId: 'root',
      file: 'routes/__pathless.tsx',
    },
    'routes/$foo.$bar.$baz': {
      path: ':foo/:bar/:baz',
      id: 'routes/$foo.$bar.$baz',
      parentId: 'root',
      file: 'routes/$foo.$bar.$baz.tsx',
    },
    'routes/api.hello': {
      path: 'api/hello',
      id: 'routes/api.hello',
      parentId: 'root',
      file: 'routes/api.hello.tsx',
    },
    'routes/projects': {
      path: 'projects',
      id: 'routes/projects',
      parentId: 'root',
      file: 'routes/projects.tsx',
    },
    'routes/projects/__pathless': {
      path: undefined,
      id: 'routes/projects/__pathless',
      parentId: 'routes/projects',
      file: 'routes/projects/__pathless.tsx',
    },
    'routes/projects/index': {
      path: undefined,
      index: true,
      id: 'routes/projects/index',
      parentId: 'routes/projects',
      file: 'routes/projects/index.tsx',
    },
    'routes/projects/create': {
      path: 'create',
      id: 'routes/projects/create',
      parentId: 'routes/projects',
      file: 'routes/projects/create.tsx',
    },
    'routes/projects/$': {
      path: '*',
      id: 'routes/projects/$',
      parentId: 'routes/projects',
      file: 'routes/projects/$.tsx',
    },
    'routes/index': {
      path: undefined,
      index: true,
      id: 'routes/index',
      parentId: 'root',
      file: 'routes/index.tsx',
    },
    'routes/node': {
      path: 'node',
      id: 'routes/node',
      parentId: 'root',
      file: 'routes/node.tsx',
    },
    'routes/$': {
      path: '*',
      id: 'routes/$',
      parentId: 'root',
      file: 'routes/$.tsx',
    },
    'routes/nested/index': {
      path: 'nested',
      index: true,
      caseSensitive: undefined,
      id: 'routes/nested/index',
      parentId: 'root',
      file: 'routes/nested/index.tsx',
    },
  };

  it.each([
    { id: 'root', expected: 'index' },
    { id: 'routes/__pathless', expected: '' },
    { id: 'routes/index', expected: 'index' },
    { id: 'routes/api.hello', expected: 'api/hello' },
    { id: 'routes/nested/index', expected: 'nested' },
    { id: 'routes/projects', expected: 'projects' },
    { id: 'routes/projects/__pathless', expected: 'projects' },
    { id: 'routes/projects/index', expected: 'projects' },
    { id: 'routes/projects/create', expected: 'projects/create' },
    { id: 'routes/projects/$', expected: 'projects/*' },
    { id: 'routes/$foo.$bar.$baz', expected: ':foo/:bar/:baz' },
    { id: 'routes/node', expected: 'node' },
    { id: 'routes/$', expected: '*' },
  ])('should return `$expected` for "$id" route', ({ id, expected }) => {
    const route = routes[id];
    expect(getPathFromRoute(route, routes)).toEqual(expected);
  });
});
