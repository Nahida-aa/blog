from wsgiref.simple_server import make_server
from py.app import App, Response

app = App()

@app.route('/')
def index_view(request):
    return Response('Hello, World!')

@app.route('/hello')
def hello_view(request):
    name = request.query_string.split('=')[1] if request.query_string else 'World'
    return Response(f'Hello, {name}!')

import json
DATA_FILE = 'data/database.json'
def load_data():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)
@app.route('/items')
def get_items_view(request):
    data = load_data()
    return Response(json.dumps(data), headers=[('Content-Type', 'application/json')])

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=4)
        
@app.route('/items/<int:item_id>')
def get_item_view(request, item_id):
    data = load_data()
    item = next((item for item in data['items'] if item['id'] == item_id), None)
    if item:
        return Response(json.dumps(item), headers=[('Content-Type', 'application/json')])
    return Response('Item not found', status='404 Not Found')

@app.route('/items', methods=['POST'])
def add_item_view(request):
    data = load_data()
    new_item = json.loads(request.body)
    data['items'].append(new_item)
    save_data(data)
    return Response(json.dumps(new_item), status='201 Created', headers=[('Content-Type', 'application/json')])

@app.route('/items/<int:item_id>', methods=['PUT'])
def replace_item_view(request, item_id):
    data = load_data()
    new_item = json.loads(request.body)
    for index, item in enumerate(data['items']):
        if item['id'] == item_id:
            data['items'][index] = new_item
            save_data(data)
            return Response(json.dumps(new_item), headers=[('Content-Type', 'application/json')])
    return Response('Item not found', status='404 Not Found')

@app.route('/items/<int:item_id>', methods=['PATCH'])
def update_item_view(request, item_id):
    data = load_data()
    updated_item = json.loads(request.body)
    for item in data['items']:
        if item['id'] == item_id:
            item.update(updated_item)
            save_data(data)
            return Response(json.dumps(item), headers=[('Content-Type', 'application/json')])
    return Response('Item not found', status='404 Not Found')

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item_view(request, item_id):
    data = load_data()
    # item_id = int(request.path.split('/')[-1])
    data['items'] = [item for item in data['items'] if item['id'] != item_id]
    save_data(data)
    return Response('Item deleted', status='204 No Content')

if __name__ == '__main__':
    try:
        server = make_server('localhost', 8000, app)
        print('Serving on http://localhost:8000...')
        server.serve_forever()
    except KeyboardInterrupt:
        print('Server is stopping...')
        server.server_close()
        print('Server stopped.')
    # http://localhost:8000
    # http://localhost:8000/hello?name=python