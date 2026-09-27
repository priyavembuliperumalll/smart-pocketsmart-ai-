from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

PAGE_ROUTES = [
    '/', '/planners', '/features', '/how-it-works', '/home-planner',
    '/party-planner', '/jewelry-planner', '/recommendations', '/history',
    '/dashboard', '/testimonials', '/about', '/login', '/register',
    '/profile', '/settings'
]


def test_pages_load():
    for route in PAGE_ROUTES:
        response = client.get(route)
        assert response.status_code == 200, route
        assert 'PocketSmart' in response.text, route


def test_planner_apis():
    assert client.post('/generate-home', data={'budget': 45000, 'room': 'Living Room', 'style': 'Modern'}).status_code == 200
    assert client.post('/generate-party', data={'budget': 50000, 'guests': 50, 'event_type': 'Birthday'}).status_code == 200
    assert client.post('/generate-jewelry', data={'budget': 45000, 'occasion': 'Wedding', 'style': 'Elegant'}).status_code == 200


def test_health():
    data = client.get('/health').json()
    assert data['status'] == 'ok'
