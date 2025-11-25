import os
os.environ["TRANSFORMERS_NO_TORCH"] = "1"
from transformers import pipeline

# Initialize Hugging Face text-generation pipeline globally (CPU)
generator = pipeline("text-generation",model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", 
    temperature=0.8,
    top_p=0.9,
    repetition_penalty=1.2,
    device=-1
)

STORY_PROMPT_TEMPLATE = (
    "Write a short, fun children’s story (200–300 words) for ages 9–12.\n"
    "Make it about {query}. Use friendly child characters such as Riya, Arjun, or Robo the Robot.\n"
    "The story should be imaginative but also teach one simple computer science or AI concept.\n"
    "Keep it light, positive, and easy to understand.\n"
    "End with a moral or a question like 'What would you build if you had your own AI robot?'\n\n"
    "Story:\n"
)

def generate_story(query: str, iterations: int = 2) -> str:
    """
    Generates a short, educational math story for children using the given query.
    """
    story = ""
    prompt = STORY_PROMPT_TEMPLATE.format(query=query)

    for _ in range(iterations):
        result = generator(
            prompt,
            max_new_tokens=400,
            temperature=0.8,
            top_p=0.9,
            do_sample=True,
            return_full_text=False,
            truncation=False
        )[0]["generated_text"]

        story += result.strip() + "\n\n"
        prompt = "Continue the story with the same tone:\n" + result

    # Clean up the text and return
    return story.strip()