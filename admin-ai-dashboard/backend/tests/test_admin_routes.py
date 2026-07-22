import unittest

from app import create_app


class AdminRoutesTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.client = self.app.test_client()

    def test_health_endpoint_returns_json(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertTrue(payload["success"])
        self.assertIn("message", payload)

    def test_contact_requests_returns_json_error_when_supabase_fails(self):
        response = self.client.get("/api/admin/contact_requests")
        self.assertEqual(response.status_code, 500)
        payload = response.get_json()
        self.assertFalse(payload["success"])
        self.assertIn("message", payload)

    def test_hyphenated_contact_requests_route_returns_json_error(self):
        response = self.client.get("/api/admin/contact-requests")
        self.assertEqual(response.status_code, 500)
        payload = response.get_json()
        self.assertFalse(payload["success"])
        self.assertIn("message", payload)

    def test_hyphenated_chat_history_route_returns_json_error(self):
        response = self.client.get("/api/admin/chat-history")
        self.assertEqual(response.status_code, 500)
        payload = response.get_json()
        self.assertFalse(payload["success"])
        self.assertIn("message", payload)


if __name__ == "__main__":
    unittest.main()
