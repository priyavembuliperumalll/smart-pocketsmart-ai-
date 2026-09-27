# Integration point for Gemini and third-party product/service APIs.
def build_recommendation_prompt(domain: str, payload: dict) -> str:
    return f"Create budget-aware recommendations for {domain}: {payload}"
