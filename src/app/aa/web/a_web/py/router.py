class Router:
    def __init__(self):
        self.routes = {}

    def add_route(self, path, handler):
        self.routes[path] = handler

    def get_handler(self, path):
        return self.routes.get(path, None) 