class Request:
    def __init__(self, environ):
        self.path = environ.get('PATH_INFO', '/')
        self.method = environ.get('REQUEST_METHOD', 'GET')
        self.query_string = environ.get('QUERY_STRING', '')
        self.headers = {key: value for key, value in environ.items() if key.startswith('HTTP_')}
        self.body = environ['wsgi.input'].read(int(environ.get('CONTENT_LENGTH', 0) or 0)).decode('utf-8')