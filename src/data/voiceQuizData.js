/**
 * Voice Quiz Data — lesson-wise questions for "Test Your Knowledge"
 * Each question has a spoken question and accepted answers (case-insensitive matching).
 */
const voiceQuizData = {
  ai: [
    {
      lessonId: 1,
      lessonTitle: "What is Artificial Intelligence?",
      questions: [
        { question: "What does AI stand for?", answers: ["artificial intelligence"] },
        { question: "Name one example of AI.", answers: ["siri", "alexa", "voice assistant", "chatgpt", "google assistant"] },
        { question: "What does AI try to mimic?", answers: ["human intelligence", "human thinking", "human decision making", "human mind", "human brain", "the human mind", "the human brain", "intelligence"] },
        { question: "Who is known as the father of Artificial Intelligence?", answers: ["john mccarthy"] },
        { question: "What does AI need to learn and make decisions?", answers: ["data"] },
      ],
    },
    {
      lessonId: 2,
      lessonTitle: "AI VS Human Intelligence",
      questions: [
        { question: "What powers human intelligence?", answers: ["brain", "the brain", "human brain"] },
        { question: "What powers Artificial Intelligence?", answers: ["computers", "algorithms", "computers and algorithms"] },
        { question: "Can AI feel emotions?", answers: ["no"] },
        { question: "What is AI generally faster at than humans?", answers: ["analyzing data", "data analysis", "processing data", "analyzing millions of data points"] },
        { question: "Can AI be truly creative like humans?", answers: ["no", "not truly", "it cannot truly understand"] },
      ],
    },
    {
      lessonId: 3,
      lessonTitle: "Types of AI",
      questions: [
        { question: "What type of AI is designed to perform a specific task?", answers: ["narrow ai", "narrow"] },
        { question: "What does AGI stand for?", answers: ["artificial general intelligence"] },
        { question: "Give an example of Narrow AI.", answers: ["spam filter", "spam email filter", "alexa", "siri", "voice assistant"] },
        { question: "Does General AI exist today?", answers: ["no", "not yet"] },
        { question: "What type of AI would be smarter than all humans?", answers: ["super ai", "super artificial intelligence", "superintelligence"] },
      ],
    },
    {
      lessonId: 4,
      lessonTitle: "What AI Can and Cannot Do",
      questions: [
        { question: "Can AI experience real emotions?", answers: ["no"] },
        { question: "How can AI help doctors?", answers: ["analyzing medical scans", "detecting diseases", "analyzing scans"] },
        { question: "Can AI translate languages in real time?", answers: ["yes"] },
        { question: "Why can't AI fully replace teachers?", answers: ["lacks empathy", "no empathy", "lacks emotional understanding"] },
        { question: "AI works best when it has lots of what?", answers: ["data", "good data", "good quality data"] },
      ],
    },
    {
      lessonId: 5,
      lessonTitle: "Basic Ethics",
      questions: [
        { question: "What is AI bias?", answers: ["unfair decisions", "unfair decisions from biased data", "biased training data"] },
        { question: "Why is privacy important in AI?", answers: ["personal data must be protected", "protect personal data", "data protection"] },
        { question: "What does transparency mean in AI ethics?", answers: ["understanding how ai makes decisions", "people can understand ai decisions", "how ai decides"] },
        { question: "Who is responsible when AI makes a harmful decision?", answers: ["the people who built it", "the companies", "developers", "builders"] },
        { question: "Name one important ethical principle in AI.", answers: ["fairness", "avoiding bias", "privacy", "transparency"] },
      ],
    },
  ],
  ml: [
    {
      lessonId: 1,
      lessonTitle: "Foundations of Machine Learning",
      questions: [
        { question: "What does ML stand for?", answers: ["machine learning"] },
        { question: "Which type of ML uses labeled data?", answers: ["supervised learning", "supervised"] },
        { question: "In Reinforcement Learning, how does an agent learn?", answers: ["rewards", "penalties", "rewards and penalties", "rewards or penalties"] },
        { question: "What are the individual measurable properties of data called?", answers: ["features"] },
        { question: "What are the answers a model predicts called?", answers: ["labels", "predictions"] },
      ],
    },
    {
      lessonId: 2,
      lessonTitle: "Data Preparation & Exploratory Analysis",
      questions: [
        { question: "What does One-Hot Encoding do?", answers: ["converts categorical variables into binary columns", "converts categories to numbers", "binary columns"] },
        { question: "What does Normalization scale data to?", answers: ["zero to one", "0 to 1"] },
        { question: "What does EDA stand for?", answers: ["exploratory data analysis"] },
        { question: "What technique helps identify the most relevant features?", answers: ["feature selection"] },
        { question: "Name a common data format used in data collection.", answers: ["csv", "json", "database"] },
      ],
    },
    {
      lessonId: 3,
      lessonTitle: "Supervised Learning: Regression, Classification & Evaluation",
      questions: [
        { question: "What does Linear Regression predict?", answers: ["a continuous value", "continuous numerical value", "numbers", "continuous"] },
        { question: "What is the purpose of Regularization?", answers: ["prevent overfitting", "penalizing large coefficients", "reduce overfitting"] },
        { question: "What does F1 Score combine?", answers: ["precision and recall"] },
        { question: "What does KNN stand for?", answers: ["k nearest neighbors"] },
        { question: "What does Gini Impurity measure in a Decision Tree?", answers: ["how mixed the classes are", "impurity", "class mixture"] },
      ],
    },
    {
      lessonId: 4,
      lessonTitle: "Unsupervised Learning, Ensembles & Deep Learning",
      questions: [
        { question: "What does PCA stand for?", answers: ["principal component analysis"] },
        { question: "What is the key idea behind Random Forest?", answers: ["combining decision trees", "many decision trees", "bagging"] },
        { question: "What is Backpropagation?", answers: ["calculates gradients to update weights", "updating weights", "gradient calculation"] },
        { question: "What does TF-IDF measure?", answers: ["word importance", "how important a word is"] },
        { question: "How does K-Means Clustering work?", answers: ["partitions data into groups", "minimizing distance to centroids", "grouping similar data"] },
      ],
    },
    {
      lessonId: 5,
      lessonTitle: "ML in Practice: Deployment, Ethics & Real-World Applications",
      questions: [
        { question: "What is the purpose of MLOps?", answers: ["automate ml lifecycle", "streamline ml", "automate machine learning"] },
        { question: "What is Data Drift?", answers: ["data properties change over time", "data changes", "statistical properties change"] },
        { question: "Why is bias in ML a concern?", answers: ["unfair outcomes", "discriminatory outcomes", "harms certain groups"] },
        { question: "What do SHAP and LIME help with?", answers: ["explaining predictions", "interpreting predictions", "model explainability"] },
        { question: "Name one real-world ML application.", answers: ["recommendation systems", "fraud detection", "medical diagnosis", "autonomous vehicles", "self driving cars"] },
      ],
    },
  ],
  robotics: [
    {
      lessonId: 1,
      lessonTitle: "What is a Robot?",
      questions: [
        { question: "What is the primary purpose of a robot?", answers: ["automation"] },
        { question: "Name a real robot used at home.", answers: ["roomba", "robotic vacuum cleaner", "vacuum cleaner"] },
        { question: "What can a robot do that regular machines cannot?", answers: ["make decisions", "respond to environment", "be programmed to decide"] },
        { question: "The word robot comes from a Czech word meaning what?", answers: ["forced labor", "work", "forced work"] },
        { question: "A robot can sense, think, and what?", answers: ["act"] },
      ],
    },
    {
      lessonId: 2,
      lessonTitle: "Robot Parts",
      questions: [
        { question: "Which robot part senses the environment?", answers: ["sensor", "sensors"] },
        { question: "What does an actuator do?", answers: ["creates movement", "moves parts", "movement"] },
        { question: "What is the brain of a robot?", answers: ["microcontroller", "processor", "computer", "controller"] },
        { question: "What provides energy to a robot?", answers: ["battery", "power source", "electricity"] },
        { question: "What is an end effector?", answers: ["gripper", "tool", "the part that interacts with objects"] },
      ],
    },
    {
      lessonId: 3,
      lessonTitle: "Robots Around Us",
      questions: [
        { question: "Name a robot used in daily life.", answers: ["vacuum cleaner", "roomba"] },
        { question: "What are robots in factories mainly used for?", answers: ["assembling products", "assembly", "production"] },
        { question: "How are robots used in healthcare?", answers: ["surgery", "surgical robots", "precise operations"] },
        { question: "Self-driving cars are an example of what?", answers: ["robots", "robots using sensors and ai"] },
        { question: "What can drones do?", answers: ["fly", "delivery", "photography", "rescue"] },
      ],
    },
    {
      lessonId: 4,
      lessonTitle: "Sensors and How Robots Sense",
      questions: [
        { question: "What are sensors used for?", answers: ["collect data", "collecting data", "data collection"] },
        { question: "What does an ultrasonic sensor measure?", answers: ["distance", "distance to objects"] },
        { question: "What does a temperature sensor detect?", answers: ["temperature", "hot or cold", "heat"] },
        { question: "Which sensor helps a robot see?", answers: ["camera", "image sensor"] },
        { question: "What can an infrared sensor help a robot do?", answers: ["detect objects", "follow lines", "line following"] },
      ],
    },
    {
      lessonId: 5,
      lessonTitle: "Simple Robot Projects for Beginners",
      questions: [
        { question: "Name a simple robot project.", answers: ["line follower", "line follower robot", "obstacle avoiding robot"] },
        { question: "What sensor does a line follower robot use?", answers: ["infrared", "infrared sensor", "ir sensor"] },
        { question: "What is Arduino?", answers: ["microcontroller", "microcontroller board"] },
        { question: "What does an obstacle-avoiding robot do when it detects objects?", answers: ["changes direction", "turns", "avoids", "change direction"] },
        { question: "Name a programming language used for building robots.", answers: ["python", "c++", "c", "javascript"] },
      ],
    },
    {
      lessonId: 6,
      lessonTitle: "Robots Around Us",
      questions: [
        { question: "Where can robots be found?", answers: ["factories", "homes", "both", "everywhere"] },
        { question: "Which robot explores other planets?", answers: ["mars rover", "curiosity", "perseverance"] },
        { question: "Can robots be found in both factories and homes?", answers: ["yes"] },
        { question: "Name a space robot.", answers: ["mars rover", "curiosity", "perseverance", "robonaut"] },
        { question: "What kind of robot helps in manufacturing?", answers: ["industrial robot", "assembly robot", "factory robot", "robotic arm"] },
      ],
    },
  ],
};

export default voiceQuizData;
