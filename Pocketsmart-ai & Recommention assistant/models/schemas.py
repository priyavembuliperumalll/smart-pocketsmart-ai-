from pydantic import BaseModel
class PlannerInput(BaseModel):
    budget: int
    preference: str | None = None
