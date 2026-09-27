from pathlib import Path
import json
from datetime import datetime, timezone

from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(title="PocketSmart AI Pro", version="2.0.0")
BASE = Path(__file__).resolve().parent
HISTORY_FILE = BASE / "data" / "planner_history.json"
HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)

def read_history():
    try:
        if not HISTORY_FILE.exists():
            return []
        return json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return []

def write_history(items):
    HISTORY_FILE.write_text(json.dumps(items[:100], ensure_ascii=False, indent=2), encoding="utf-8")

app.mount("/static", StaticFiles(directory=BASE / "static"), name="static")
templates = Jinja2Templates(directory=BASE / "templates")

PAGES = {
    "/": "index.html",
    "/features": "features.html",
    "/how-it-works": "how-it-works.html",
    "/planners": "planners.html",
    "/home-planner": "home-planner.html",
    "/party-planner": "party-planner.html",
    "/jewelry-planner": "jewelry-planner.html",
    "/recommendations": "recommendations.html",
    "/history": "history.html",
    "/dashboard": "dashboard.html",
    "/testimonials": "testimonials.html",
    "/about": "about.html",
    "/login": "login.html",
    "/register": "register.html",
    "/profile": "profile.html",
    "/settings": "settings.html",
}

def render(page: str):
    async def handler(request: Request):
        return templates.TemplateResponse(request=request, name=page)
    return handler

for route, page in PAGES.items():
    app.add_api_route(route, render(page), methods=["GET"], response_class=HTMLResponse)

@app.post("/generate-home")
async def generate_home(
    budget: int = Form(..., ge=100, le=10_000_000),
    room: str = Form("Living Room"),
    style: str = Form("Modern"),
    style_preference: str = Form("Contemporary"),
    occasion: str = Form("New Home"),
    mood: str = Form("Calm"),
    what_you_want: str = Form("Complete room"),
    focus: str = Form("Furniture"),
    quality: str = Form("Value"),
):
    return {
        "type": "home",
        "budget": budget,
        "room": room,
        "style": style,
        "style_preference": style_preference,
        "occasion": occasion,
        "mood": mood,
        "what_you_want": what_you_want,
        "focus": focus,
        "quality": quality,
        "message": f"Plan created for {room} in {style} style within ₹{budget:,}.",
        "breakdown": [
            {"label": "Furniture", "amount": round(budget * 0.45)},
            {"label": "Lighting", "amount": round(budget * 0.15)},
            {"label": "Décor", "amount": round(budget * 0.20)},
            {"label": "Reserve", "amount": round(budget * 0.20)},
        ],
    }

@app.post("/generate-party")
async def generate_party(
    budget: int = Form(..., ge=100, le=10_000_000),
    guests: int = Form(...),
    event_type: str = Form("Birthday"),
    occasion: str = Form("Birthday"),
    priority: str = Form("Food"),
    style: str = Form("Fun"),
    mood: str = Form("Fun"),
    what_you_want: str = Form("Complete party"),
    quality: str = Form("Value"),
):
    per_guest = round(budget / max(guests, 1))
    return {
        "type": "party",
        "budget": budget,
        "guests": guests,
        "event_type": event_type,
        "occasion": occasion,
        "priority": priority,
        "style": style,
        "mood": mood,
        "what_you_want": what_you_want,
        "quality": quality,
        "message": f"{event_type} plan created for {guests} guests.",
        "per_guest": per_guest,
        "breakdown": [
            {"label": "Food & drinks", "amount": round(budget * 0.40)},
            {"label": "Venue", "amount": round(budget * 0.25)},
            {"label": "Decor", "amount": round(budget * 0.15)},
            {"label": "Entertainment", "amount": round(budget * 0.20)},
        ],
    }

@app.post("/generate-jewelry")
async def generate_jewelry(
    budget: int = Form(..., ge=100, le=10_000_000),
    occasion: str = Form("Wedding"),
    style: str = Form("Elegant"),
    mood: str = Form("Elegant"),
    look_feel: str = Form("Timeless"),
    piece: str = Form("Necklace"),
    metal: str = Form("Gold"),
    quality: str = Form("Value"),
):
    return {
        "type": "jewelry",
        "budget": budget,
        "occasion": occasion,
        "style": style,
        "mood": mood,
        "look_feel": look_feel,
        "piece": piece,
        "metal": metal,
        "quality": quality,
        "message": f"{occasion} jewelry shortlist created in {style} style.",
        "breakdown": [
            {"label": "Hero piece", "amount": round(budget * 0.55)},
            {"label": "Matching piece", "amount": round(budget * 0.25)},
            {"label": "Finishing details", "amount": round(budget * 0.10)},
            {"label": "Reserve", "amount": round(budget * 0.10)},
        ],
    }

@app.get("/session-info")
async def session_info():
    return {"logged_in": False, "user": None}

@app.get("/api/history")
async def history_api(username: str = ""):
    items = read_history()
    if username:
        items = [x for x in items if x.get("username", "Guest") == username]
    return {"items": items[:50]}

@app.post("/api/history")
async def save_history(payload: dict):
    items = read_history()
    entry = dict(payload)
    entry.setdefault("id", int(datetime.now(timezone.utc).timestamp() * 1000))
    entry.setdefault("createdAt", datetime.now(timezone.utc).isoformat())
    entry.setdefault("username", "Guest")
    items = [entry] + [x for x in items if x.get("id") != entry["id"]]
    write_history(items)
    return {"ok": True, "item": entry}

@app.get("/health")
async def health():
    return {"status": "ok", "app": "PocketSmart AI", "version": "2.0.0"}
 