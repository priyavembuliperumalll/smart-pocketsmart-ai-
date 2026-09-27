# PocketSmart AI — Pro Full-Stack Starter

A polished multi-page FastAPI + Jinja2 frontend starter based on the supplied PocketSmart AI project specification.

## Included pages
- Landing / Home
- Features
- How It Works
- Planner Hub (choose Home Interior / Party / Jewelry)
- Home Interior Planner
- Party Planner
- Jewelry Planner
- AI Recommendations
- Recommendation History
- Dashboard
- Testimonials
- About
- Login
- Register
- Profile
- Settings
- 404

## Frontend
- Responsive glassmorphism UI
- Animated gradients and floating graphics
- Dark/light theme toggle
- Mobile navigation
- Interactive budget sliders
- Planner forms
- Recommendation cards
- Charts and progress visuals
- Accessible focus states and reduced-motion support

## Backend
FastAPI starter routes matching the supplied project:
`/generate-home`, `/generate-party`, `/generate-jewelry`, authentication/session placeholders, history, and recommendation details.

Run:
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The recommendation endpoints are demo/mock implementations. Connect Gemini and live commerce APIs using environment variables before production use.

## 2.0 fixes
- Planner navigation now opens a dedicated planner-selection page.
- Fixed FastAPI/Starlette TemplateResponse compatibility.
- Fixed native select text contrast in dark and light themes.
- Planner forms now call the FastAPI endpoints and render live breakdowns.
- Login/register demo flows redirect to the dashboard.
- Mobile navigation and disabled/loading states are improved.
- Added a planner hub and stronger interaction feedback.


## Visual UI upgrade
- Screenshot-inspired blue/white responsive interface.
- Direct INR budget entry with live budget details, protected reserve and quick amounts.
- Real-photo inspiration cards using Pexels image URLs.
- Register/login now include username, email, password confirmation, and password show/hide controls without password-strength rules in the demo UI.
