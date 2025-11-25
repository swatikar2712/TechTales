# quiz_generator.py

quizzes = {
    "smart home": {
        "theme": "Smart Home",
        "questions": [
            {
                "question": "What does a smart home use to control lights and devices?",
                "options": ["Electricity", "Artificial Intelligence", "Batteries", "Remote controls"],
                "answer": "Artificial Intelligence"
            },
            {
                "question": "Which of these can be a smart home device?",
                "options": ["Smart bulb", "Wooden chair", "Paper fan", "Candle"],
                "answer": "Smart bulb"
            },
            {
                "question": "What can voice assistants like Alexa do?",
                "options": ["Cook food", "Play music", "Clean rooms", "Paint walls"],
                "answer": "Play music"
            }
        ]
    },
    "ai ethics": {
        "theme": "AI Ethics",
        "questions": [
            {
                "question": "Why is AI Ethics important?",
                "options": ["To make AI fair and responsible", "To make robots stronger", "To reduce costs", "To delete data"],
                "answer": "To make AI fair and responsible"
            },
            {
                "question": "Which of these shows AI bias?",
                "options": ["Treating all users equally", "Favoring one group unfairly", "Helping everyone", "Ignoring bad data"],
                "answer": "Favoring one group unfairly"
            },
            {
                "question": "Who decides what is ethical in AI?",
                "options": ["Programmers and society", "Only robots", "Only machines", "Nobody"],
                "answer": "Programmers and society"
            }
        ]
    },
    "sustainable development": {
        "theme": "Sustainable Development",
        "questions": [
            {
                "question": "Which goal focuses on clean energy?",
                "options": ["Goal 7", "Goal 10", "Goal 3", "Goal 1"],
                "answer": "Goal 7"
            },
            {
                "question": "Why is sustainability important?",
                "options": ["To protect the environment", "To use more plastic", "To waste energy", "To cut down forests"],
                "answer": "To protect the environment"
            },
            {
                "question": "What is one example of sustainable energy?",
                "options": ["Solar power", "Coal", "Diesel", "Oil"],
                "answer": "Solar power"
            }
        ]
    }
}

# ✅ Make sure this part exists at the bottom:
theme_game_map = {
    "smart home": "emoji_scavenger_hunt",
    "ai ethics": "balloon_debate",
    "sustainable development": "goals_board_game"
}

def get_quiz_for_theme(theme: str):
    theme = theme.lower().strip()
    return quizzes.get(theme, None)
