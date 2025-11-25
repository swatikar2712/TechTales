from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from story_generator import generate_story
from quiz_generator import get_quiz_for_theme, theme_game_map
import uvicorn
import json
from pathlib import Path
#########
from diffusers import AutoPipelineForText2Image
import torch
import uuid
from fastapi.responses import FileResponse
import base64
from io import BytesIO

###########

app = FastAPI(title="TechTales Story Generator API")
############
print("Loading SD-Turbo model...")

pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/sd-turbo",
    torch_dtype=torch.float32
).to("cpu")

print("SD-Turbo ready.")

########



from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StoryRequest(BaseModel):
    query: str

class QuizRequest(BaseModel):
    theme: str


@app.get("/")
async def root():
    return {"message": "Welcome to TechTales Story Generator API"}

@app.post("/generate_story")
async def create_story(request: StoryRequest):
    try:
        # 1️⃣ Generate story text
        story = generate_story(request.query)

        # 2️⃣ Use the generated story as input for images
        image_prompts = [
            f"Children's book illustration: {story[:300]}",
            f"Colorful cute scene from this story: {story[:300]}",
            f"Friendly AI story artwork: {story[:300]}"
        ]

        images_base64 = []

        # 3️⃣ Generate 3 images using the story text
        for prompt in image_prompts:
            result = pipe(
                prompt=prompt,
                num_inference_steps=2,
                guidance_scale=0.0
            )

            img = result.images[0]

            # Convert image → base64 → send to Flutter
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            img_bytes = buffer.getvalue()
            img_base64 = base64.b64encode(img_bytes).decode("utf-8")

            images_base64.append(img_base64)

        # 4️⃣ Return story + images to Flutter
        return {
            "success": True,
            "story": story,
            "images": images_base64,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# ---------------------------------------------------------
# ✅ QUIZ HANDLING SECTION
# ---------------------------------------------------------
QUIZ_PATH = Path(__file__).parent / "quizzes.json"

# Load all quizzes from JSON
with open(QUIZ_PATH, "r", encoding="utf-8") as f:
    all_quizzes = json.load(f)


@app.post("/get_quiz")
async def get_quiz(request: Request):
    data = await request.json()
    theme = data.get("theme", "").strip()
    print("Requested theme:", theme)

    # Find quiz (case-insensitive match)
    for key, questions in all_quizzes.items():
        if key.lower() == theme.lower():

            # 🧠 Add correct answer text dynamically
            updated_questions = []
            for q in questions:
                try:
                    correct_text = q["options"][q["answer_index"]].split(") ", 1)[-1]
                except Exception:
                    correct_text = None
                q["answer"] = correct_text
                updated_questions.append(q)

            # Optional: Add linked mini-game for that theme (if exists)
            linked_game = theme_game_map.get(key.lower(), None)

            return {
                "success": True,
                "quiz": {
                    "theme": key,
                    "questions": updated_questions,
                    "game": linked_game  # Optional extra game suggestion
                }
            }

    return {"success": False, "message": f"No quiz found for theme {theme}"}

##############


class ImageRequest(BaseModel):
    prompt: str


@app.post("/generate_image")
async def generate_image(request: ImageRequest):
    try:
        prompt = request.prompt.strip()
        if not prompt:
            raise HTTPException(status_code=400, detail="Prompt cannot be empty.")

        # Generate image
        result = pipe(
            prompt=prompt,
            num_inference_steps=2,
            guidance_scale=0.0
        )

        image = result.images[0]

        # Save image to static folder
        filename = f"{uuid.uuid4()}.png"
        output_path = Path("static") / filename
        image.save(output_path)

        # Return URL for Flutter app
        return {
            "success": True,
            "image_url": f"/static/{filename}"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


#############
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
