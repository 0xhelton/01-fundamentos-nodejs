export function buildRoutePath(path) {
  const routeParameterRegex = /:([a-zA-Z]+)/;
  const pathWithParams = path.replaceAll(routeParameterRegex, "([a-z0-9-_]+)");

  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}
