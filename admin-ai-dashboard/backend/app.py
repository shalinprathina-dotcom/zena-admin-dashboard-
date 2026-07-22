from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase_client import get_supabase

supabase = get_supabase()

app = Flask(__name__)
CORS(app)


@app.get("/")
def home():
    return "ADMIN AI BACKEND RUNNING"


# =========================
# ADMIN DASHBOARD API
# =========================

@app.get("/api/admin/dashboard")
def dashboard():

    try:
        # Contact request count
        contact_response = (
            supabase
            .table("contact_requests")
            .select("id", count="exact")
            .execute()
        )

        contact_count = contact_response.count or 0


        # Chat history count
        chat_response = (
            supabase
            .table("chat_history")
            .select("id", count="exact")
            .execute()
        )

        chat_count = chat_response.count or 0


        return jsonify({
            "success": True,
            "data": {
                "total_contacts": contact_count,
                "total_chats": chat_count
            }
        })


    except Exception as e:
        print("DASHBOARD ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# =========================
# CHAT HISTORY API
# =========================

@app.get("/api/admin/chat_history")
def chat_history():

    try:
        response = (
            supabase
            .table("chat_history")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return jsonify({
            "success": True,
            "chat_history": response.data
        })

    except Exception as e:
        print("CHAT HISTORY FETCH ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


# =========================
# CONTACT REQUESTS API
# =========================

@app.get("/api/admin/contact_requests")
def get_contact_requests():

    try:
        response = (
            supabase
            .table("contact_requests")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return jsonify({
            "success": True,
            "data": response.data
        })

    except Exception as e:
        print("ADMIN FETCH ERROR:", e)

        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

# =========================
# ADMIN CONTACT API
# =========================

@app.post("/api/contact")
def contact():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    requirement = data.get("requirement")

    print("New Contact Request:")
    print(name, email, phone, requirement)

    return jsonify({
        "success": True,
        "message": "Contact request received"
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8000,
        debug=True
    )