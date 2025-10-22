class Response:
    def __init__(self, body='', status='200 OK', headers=None):
        self.body = body
        self.status = status
        self.headers = headers or [('Content-Type', 'text/html')]

    def __call__(self, start_response):
        start_response(self.status, self.headers)
        return [self.body.encode('utf-8')]