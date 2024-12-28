import re

class Request:
    def __init__(self, environ):
        self.path = environ.get('PATH_INFO', '/')
        self.method = environ.get('REQUEST_METHOD', 'GET')
        self.query_string = environ.get('QUERY_STRING', '')
        self.headers = {key: value for key, value in environ.items() if key.startswith('HTTP_')}
        self.body = environ['wsgi.input'].read(int(environ.get('CONTENT_LENGTH', 0) or 0)).decode('utf-8')

class Response:
    def __init__(self, body='', status='200 OK', headers=None):
        self.body = body
        self.status = status
        self.headers = headers or [('Content-Type', 'text/html')]

    def __call__(self, start_response):
        start_response(self.status, self.headers)
        return [self.body.encode('utf-8')]

class Router:
    def __init__(self):
        self.routes = []

    def add_route(self, path, handler, methods=['GET']):
        print(f"add_route: {path}, {handler}, {methods}")
        path = re.sub(r'<int:(\w+)>', r'(?P<\1>\\d+)', path)
        path = re.sub(r'<(\w+)>', r'(?P<\1>[^/]+)', path)
        self.routes.append((re.compile(f'^{path}$'), handler, methods))

    def get_handler(self, path, method):
        for pattern, handler, methods in self.routes:
            match = pattern.match(path)
            if match and method in methods:
                return handler, match.groupdict()
        return None, None

class App:
    def __init__(self):
        self.router = Router()

    def route(self, path, methods=['GET']):
        def wrapper(handler):
            self.router.add_route(path, handler, methods)
            return handler
        return wrapper

    def __call__(self, environ, start_response):
        request = Request(environ)
        handler, kwargs = self.router.get_handler(request.path, request.method)
        if handler:
            response = handler(request, **kwargs)
        else:
            response = Response('Not Found', '404 Not Found')
        return response(start_response)