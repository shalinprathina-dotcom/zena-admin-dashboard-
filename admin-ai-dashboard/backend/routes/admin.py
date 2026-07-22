from flask import Blueprint, jsonify

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

print("✅ admin.py loaded")


@admin_bp.get("/dashboard")
def dashboard():
    print("✅ dashboard called")
    return jsonify({
        "success": True,
        "message": "Dashboard API Working"
    })


@admin_bp.get("/chat_history")
def chat_history():
    print("✅ chat_history called")
    return jsonify({
        "success": True,
        "message": "Chat History Working"
    })


@admin_bp.get("/contact_requests")
def contact_requests():
    print("✅ contact_requests called")
    return jsonify({
        "success": True,
        "message": "Contact Requests Working"
    })