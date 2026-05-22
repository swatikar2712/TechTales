export const courses = [
  {
    class: "ai",
    title: "Artificial Intelligence",
    modules: [
      {
        id: 1,
        title: "What is Artificial Intelligence?",
        video: "/videos/AIU1.mp4",
        videoHindi: "/videos/AIU1_hindi.mp4",
        quiz: [
          {
            question: "AI stands for?",
            options: [
              "Artificial Intelligence",
              "Automated Input",
              "Advanced Internet",
            ],
            answer: "Artificial Intelligence",
          },
          {
            question: "Which of these is an example of AI?",
            options: [
              "A voice assistant like Siri or Alexa",
              "A regular calculator",
              "A light switch",
            ],
            answer: "A voice assistant like Siri or Alexa",
          },
          {
            question: "What does AI try to mimic?",
            options: [
              "Human intelligence and decision-making",
              "The speed of a car engine",
              "The color of objects",
            ],
            answer: "Human intelligence and decision-making",
          },
          {
            question: "Who is known as the father of Artificial Intelligence?",
            options: [
              "John McCarthy",
              "Albert Einstein",
              "Isaac Newton",
            ],
            answer: "John McCarthy",
          },
          {
            question: "AI needs _____ to learn and make decisions.",
            options: [
              "Data",
              "Paint",
              "Sunlight",
            ],
            answer: "Data",
          },
        ],
        miniGame: {
          type: "match",
          title: "🧩 Match the AI Terms!",
          instruction: "Click a term, then click its meaning to make a match!",
          pairs: [
            { term: "AI", definition: "Machines that think like humans" },
            { term: "Siri", definition: "A voice assistant by Apple" },
            { term: "Data", definition: "Information AI learns from" },
            { term: "Algorithm", definition: "Step-by-step instructions" },
          ],
        },
      },
      {
        id: 2,
        title: "AI VS Human Intelligence?",
        video: "/videos/Vallika_English.mp4",
        videoHindi: "/videos/Vallika_Hindi.mp4",
        quiz: [
          {
            question:
              "Which of the following is a key difference between Artificial Intelligence (AI) and Human Intelligence?",
            options: [
              "AI can think creatively and emotionally on its own",
              "Human intelligence is limited to processing numerical data",
              "AI operates based on programmed algorithms and data patterns",
            ],
            answer:
              "AI operates based on programmed algorithms and data patterns",
          },
          {
            question: "What can humans do that AI currently cannot?",
            options: [
              "Feel emotions and have consciousness",
              "Process large amounts of data quickly",
              "Work 24 hours without rest",
            ],
            answer: "Feel emotions and have consciousness",
          },
          {
            question: "Which task is AI generally faster at than humans?",
            options: [
              "Analyzing millions of data points",
              "Writing a poem with deep emotion",
              "Understanding sarcasm in conversation",
            ],
            answer: "Analyzing millions of data points",
          },
          {
            question: "Human intelligence is powered by the _____, while AI is powered by _____.",
            options: [
              "Brain; computers and algorithms",
              "Internet; electricity",
              "Heart; solar energy",
            ],
            answer: "Brain; computers and algorithms",
          },
          {
            question: "Can AI be creative like humans?",
            options: [
              "It can generate creative outputs but doesn't truly understand them",
              "Yes, AI feels inspiration just like humans",
              "No, AI cannot produce anything creative at all",
            ],
            answer: "It can generate creative outputs but doesn't truly understand them",
          },
        ],
        miniGame: {
          type: "trueFalse",
          title: "⚡ True or False Blitz!",
          instruction: "Are these facts about AI vs Humans true or false? Be quick!",
          statements: [
            { text: "AI can feel emotions just like humans.", answer: false },
            { text: "AI can process millions of data points faster than humans.", answer: true },
            { text: "Human brains use electricity and chemicals to think.", answer: true },
            { text: "AI can truly understand sarcasm perfectly.", answer: false },
            { text: "AI is powered by computers and algorithms.", answer: true },
          ],
        },
      },
      {
        id: 3,
        title: "Types of AI",
        video: "/videos/Unit3.mp4",
        videoHindi: "/videos/Unit3_hindi.mp4",
        quiz: [
          {
            question:
              "Which type of AI is designed to perform a specific task?",
            options: ["General AI", "Narrow AI", "Strong AI"],
            answer: "Narrow AI",
          },
          {
            question: "What is General AI (AGI)?",
            options: [
              "AI that can understand and learn any task like a human",
              "AI that only plays chess",
              "AI that runs on old computers",
            ],
            answer: "AI that can understand and learn any task like a human",
          },
          {
            question: "Which of these is an example of Narrow AI?",
            options: [
              "A spam email filter",
              "A robot that can do everything a human can",
              "A self-aware computer",
            ],
            answer: "A spam email filter",
          },
          {
            question: "Super AI is _____ compared to human intelligence.",
            options: [
              "Smarter and more capable in every way",
              "Exactly the same",
              "Less capable",
            ],
            answer: "Smarter and more capable in every way",
          },
          {
            question: "Does General AI (AGI) exist today?",
            options: [
              "No, it is still a goal for future research",
              "Yes, it is in every smartphone",
              "Yes, ChatGPT is General AI",
            ],
            answer: "No, it is still a goal for future research",
          },
        ],
        miniGame: {
          type: "sortBuckets",
          title: "🗂️ Sort the AI Types!",
          instruction: "Drag each example into the correct AI category!",
          buckets: ["Narrow AI", "General AI", "Super AI"],
          items: [
            { text: "Spam email filter", bucket: "Narrow AI" },
            { text: "Chess-playing program", bucket: "Narrow AI" },
            { text: "A robot that learns any job like a human", bucket: "General AI" },
            { text: "AI smarter than all humans combined", bucket: "Super AI" },
            { text: "Voice assistant (Alexa)", bucket: "Narrow AI" },
            { text: "AI that passes every human test", bucket: "General AI" },
          ],
        },
      },
      {
        id: 4,
        title: "What AI Can and Cannot Do",
        video: "/videos/Unit4.mp4",
        videoHindi: "/videos/Unit4_hindi.mp4",
        quiz: [
          {
            question:
              "Which of the following is something AI cannot do like humans?",
            options: [
              "Analyze large amounts of data",
              "Recognize patterns in images",
              "Experience real emotions and consciousness",
            ],
            answer: "Experience real emotions and consciousness",
          },
          {
            question: "AI can help doctors by _____.",
            options: [
              "Analyzing medical scans to detect diseases",
              "Performing surgery completely on its own without oversight",
              "Replacing all doctors permanently",
            ],
            answer: "Analyzing medical scans to detect diseases",
          },
          {
            question: "Which of these can AI do well today?",
            options: [
              "Translate languages in real time",
              "Understand the meaning of life",
              "Make moral judgments on its own",
            ],
            answer: "Translate languages in real time",
          },
          {
            question: "Why can't AI fully replace human teachers?",
            options: [
              "It lacks empathy, emotional understanding, and real-life experience",
              "It is too expensive",
              "It cannot display text on a screen",
            ],
            answer: "It lacks empathy, emotional understanding, and real-life experience",
          },
          {
            question: "AI works best when it has _____.",
            options: [
              "Lots of good quality data to learn from",
              "Very little information",
              "No instructions at all",
            ],
            answer: "Lots of good quality data to learn from",
          },
        ],
        miniGame: {
          type: "wordScramble",
          title: "🔤 Unscramble AI Words!",
          instruction: "Click the letters in the right order to spell the AI word!",
          words: [
            { scrambled: "ATDA", answer: "DATA", hint: "AI needs this to learn" },
            { scrambled: "NACS", answer: "SCAN", hint: "AI can do this to medical images" },
            { scrambled: "TLARANETS", answer: "TRANSLATE", hint: "AI can do this with languages" },
            { scrambled: "IAMSPYEHT", answer: "EMPATHY", hint: "AI cannot feel this" },
          ],
        },
      },
      {
        id: 5,
        title: "Basic Ethics",
        video: "/videos/Unit5.mp4",
        videoHindi: "/videos/Unit5_hindi.mp4",
        quiz: [
          {
            question:
              "Which is an important ethical principle in AI?",
            options: [
              "Ensuring fairness and avoiding bias",
              "Hiding how AI works",
              "Ignoring privacy",
            ],
            answer: "Ensuring fairness and avoiding bias",
          },
          {
            question: "What is AI bias?",
            options: [
              "When AI makes unfair decisions because of biased training data",
              "When AI runs too slowly",
              "When AI uses too much electricity",
            ],
            answer: "When AI makes unfair decisions because of biased training data",
          },
          {
            question: "Why is privacy important in AI?",
            options: [
              "AI systems often use personal data that must be protected",
              "Privacy makes AI run faster",
              "Privacy is not related to AI at all",
            ],
            answer: "AI systems often use personal data that must be protected",
          },
          {
            question: "What does 'transparency' mean in AI ethics?",
            options: [
              "People should be able to understand how AI makes decisions",
              "AI should be invisible to users",
              "AI code should be written in secret",
            ],
            answer: "People should be able to understand how AI makes decisions",
          },
          {
            question: "Who is responsible when AI makes a harmful decision?",
            options: [
              "The people and companies who built and deployed the AI",
              "Nobody — AI is on its own",
              "The user's computer hardware",
            ],
            answer: "The people and companies who built and deployed the AI",
          },
        ],
        miniGame: {
          type: "match",
          title: "🧩 Match Ethics Terms!",
          instruction: "Click a term, then click its meaning!",
          pairs: [
            { term: "Bias", definition: "Unfair decisions from bad data" },
            { term: "Privacy", definition: "Protecting personal information" },
            { term: "Transparency", definition: "Understanding how AI decides" },
            { term: "Fairness", definition: "Treating everyone equally" },
          ],
        },
      },
    ],
  },

  {
    class: "ml",
    title: "Machine Learning",
    modules: [
      /* ===== Unit 1: Foundations of Machine Learning ===== */
      {
        id: 1,
        title: "Introduction to Machine Learning",
        video: "/videos/MLU1.mp4",
        videoHindi: "/videos/MLU1_hindi.mp4",
        description:
          "Introduction to ML, types of learning, ML pipeline, key terminology, and the role of data.",
        topics: [
          "What is Machine Learning?",
          "ML vs Traditional Programming",
          "Types of ML: Supervised, Unsupervised, Reinforcement Learning",
          "Semi-Supervised & Self-Supervised Learning Overview",
          "The ML Pipeline: Problem → Data → Model → Evaluation → Deployment",
          "Key Terminology: Features, Labels, Training/Test Sets, Hypothesis, Loss Function",
          "Applications of ML in daily life",
        ],
        quiz: [
          {
            question: "What does Machine Learning enable computers to do?",
            options: [
              "Learn and improve from data without being explicitly programmed",
              "Only follow hard-coded rules written by programmers",
              "Replace all human workers immediately",
            ],
            answer:
              "Learn and improve from data without being explicitly programmed",
          },
          {
            question:
              "Which type of ML uses labeled data to train models?",
            options: [
              "Unsupervised Learning",
              "Supervised Learning",
              "Reinforcement Learning",
            ],
            answer: "Supervised Learning",
          },
          {
            question:
              "In Reinforcement Learning, how does an agent learn?",
            options: [
              "By memorizing the entire dataset",
              "By receiving rewards or penalties from its environment",
              "By clustering similar data points",
            ],
            answer:
              "By receiving rewards or penalties from its environment",
          },
          {
            question:
              "Which term describes the individual measurable properties of data used as input to a model?",
            options: ["Labels", "Features", "Predictions"],
            answer: "Features",
          },
        ],
        miniGame: {
          type: "match",
          title: "🧩 Match ML Terms!",
          instruction: "Click a term, then click its meaning!",
          pairs: [
            { term: "Features", definition: "Input properties of data" },
            { term: "Labels", definition: "The answers the model predicts" },
            { term: "Supervised", definition: "Learning with labeled data" },
            { term: "Reinforcement", definition: "Learning from rewards & penalties" },
          ],
        },
      },

      /* ===== Unit 2: Data Preparation & Exploratory Analysis ===== */
      {
        id: 2,
        title: "How Computers Learn from Data",
        video: "/videos/ML_U2_ENG.mp4",
        videoHindi: "/videos/ML_U2_HIN.mp4",
        description:
          "Data collection, cleaning, preprocessing, feature engineering, and exploratory data analysis.",
        topics: [
          "Data Collection: Sources, Formats (CSV, JSON, Databases)",
          "Handling Missing Values: Imputation, Deletion strategies",
          "Handling Outliers: IQR, Z-score methods",
          "Data Encoding: One-Hot Encoding, Label Encoding, Ordinal Encoding",
          "Feature Scaling: Normalization (Min-Max) vs Standardization (Z-score)",
          "Feature Engineering: Creating, Transforming, and Selecting Features",
          "Feature Selection: Filter, Wrapper, and Embedded methods",
          "Exploratory Data Analysis (EDA): Distributions, Correlations, Visualizations",
          "Train-Test Split and the importance of data partitioning",
        ],
        quiz: [
          {
            question:
              "What is the purpose of One-Hot Encoding?",
            options: [
              "Convert categorical variables into numerical binary columns",
              "Remove duplicate rows from a dataset",
              "Increase the number of data samples",
            ],
            answer:
              "Convert categorical variables into numerical binary columns",
          },
          {
            question:
              "What is the difference between Normalization and Standardization?",
            options: [
              "Normalization scales data to 0–1; Standardization scales to mean 0, std 1",
              "They are exactly the same technique",
              "Normalization removes outliers; Standardization adds new features",
            ],
            answer:
              "Normalization scales data to 0–1; Standardization scales to mean 0, std 1",
          },
          {
            question:
              "Why is Exploratory Data Analysis (EDA) important?",
            options: [
              "It helps understand data distributions, spot patterns, and detect anomalies before modeling",
              "It automatically builds the best ML model",
              "It is only used after model deployment",
            ],
            answer:
              "It helps understand data distributions, spot patterns, and detect anomalies before modeling",
          },
          {
            question:
              "Which technique helps identify the most relevant features for a model?",
            options: [
              "Data Augmentation",
              "Feature Selection",
              "Gradient Descent",
            ],
            answer: "Feature Selection",
          },
        ],
        miniGame: {
          type: "sortBuckets",
          title: "🗂️ Sort the Data Steps!",
          instruction: "Put each step in the correct stage of data preparation!",
          buckets: ["Cleaning", "Encoding", "Scaling"],
          items: [
            { text: "Remove missing values", bucket: "Cleaning" },
            { text: "Fix outliers", bucket: "Cleaning" },
            { text: "One-Hot Encoding", bucket: "Encoding" },
            { text: "Label Encoding", bucket: "Encoding" },
            { text: "Min-Max Normalization", bucket: "Scaling" },
            { text: "Z-score Standardization", bucket: "Scaling" },
          ],
        },
      },

      /* ===== Unit 3: Supervised Learning – Regression, Classification & Evaluation ===== */
      {
        id: 3,
        title: "Types of Machine Learning",
        video: "/videos/MLU3.mp4",
        videoHindi: "/videos/MLU3_hindi.mp4",
        description:
          "Core supervised learning algorithms for regression and classification, plus model evaluation techniques.",
        topics: [
          "Regression Algorithms:",
          "  • Linear Regression & Multiple Linear Regression",
          "  • Polynomial Regression",
          "  • Ridge (L2) & Lasso (L1) Regression – Regularization",
          "  • Evaluation: MAE, MSE, RMSE, R² Score",
          "Classification Algorithms:",
          "  • Logistic Regression",
          "  • K-Nearest Neighbors (KNN)",
          "  • Support Vector Machines (SVM) – Linear & Kernel Trick",
          "  • Decision Trees & Information Gain / Gini Impurity",
          "  • Naive Bayes Classifier",
          "Model Evaluation & Validation:",
          "  • Confusion Matrix: TP, TN, FP, FN",
          "  • Precision, Recall, F1-Score",
          "  • ROC Curve & AUC",
          "  • Cross-Validation (k-Fold, Stratified k-Fold)",
          "  • Bias-Variance Tradeoff, Overfitting & Underfitting",
          "  • Hyperparameter Tuning: Grid Search, Random Search",
        ],
        quiz: [
          {
            question:
              "What does Linear Regression predict?",
            options: [
              "A continuous numerical value",
              "A category or class label",
              "A cluster assignment",
            ],
            answer: "A continuous numerical value",
          },
          {
            question:
              "What is the purpose of Regularization (Ridge / Lasso)?",
            options: [
              "Prevent overfitting by penalizing large model coefficients",
              "Speed up data collection",
              "Convert features into categories",
            ],
            answer:
              "Prevent overfitting by penalizing large model coefficients",
          },
          {
            question:
              "Which metric is most useful when classes are highly imbalanced?",
            options: [
              "Accuracy alone",
              "Precision, Recall, and F1-Score",
              "Mean Absolute Error",
            ],
            answer: "Precision, Recall, and F1-Score",
          },
          {
            question:
              "What does k-Fold Cross-Validation do?",
            options: [
              "Splits data into k subsets and trains/tests on each fold to reduce evaluation variance",
              "Trains the model k times on the full dataset",
              "Removes k features from the dataset",
            ],
            answer:
              "Splits data into k subsets and trains/tests on each fold to reduce evaluation variance",
          },
          {
            question:
              "In a Decision Tree, what does Gini Impurity measure?",
            options: [
              "How mixed (impure) the classes are at a given node",
              "The depth of the tree",
              "The number of features used",
            ],
            answer:
              "How mixed (impure) the classes are at a given node",
          },
        ],
        miniGame: {
          type: "trueFalse",
          title: "⚡ Algorithm True or False!",
          instruction: "Are these statements about ML algorithms true or false?",
          statements: [
            { text: "Linear Regression predicts categories.", answer: false },
            { text: "KNN classifies based on nearest neighbors.", answer: true },
            { text: "Decision Trees split data using questions.", answer: true },
            { text: "F1-Score combines Precision and Recall.", answer: true },
            { text: "Overfitting means the model is too simple.", answer: false },
          ],
        },
      },

      /* ===== Unit 4: Unsupervised Learning, Ensembles & Deep Learning ===== */
      {
        id: 4,
        title: "Everyday Uses of Machine Learning",
        video: "/videos/MLU4.mp4",
        videoHindi: "/videos/MLU4_hindi.mp4",
        description:
          "Clustering, dimensionality reduction, ensemble methods, neural networks, and NLP fundamentals.",
        topics: [
          "Clustering Algorithms:",
          "  • K-Means Clustering & Elbow Method",
          "  • Hierarchical Clustering (Agglomerative & Divisive)",
          "  • DBSCAN – Density-Based Clustering",
          "  • Silhouette Score for Cluster Evaluation",
          "Dimensionality Reduction:",
          "  • Principal Component Analysis (PCA)",
          "  • t-SNE for Visualization",
          "  • Linear Discriminant Analysis (LDA)",
          "Ensemble Learning:",
          "  • Bagging – Bootstrap Aggregating & Random Forest",
          "  • Boosting – AdaBoost, Gradient Boosting, XGBoost",
          "  • Stacking & Voting Classifiers",
          "Neural Networks & Deep Learning Fundamentals:",
          "  • Perceptron & Multi-Layer Perceptron (MLP)",
          "  • Activation Functions: Sigmoid, ReLU, Softmax",
          "  • Backpropagation & Gradient Descent (SGD, Adam)",
          "  • Convolutional Neural Networks (CNNs) – Image Tasks",
          "  • Recurrent Neural Networks (RNNs) & LSTMs – Sequence Tasks",
          "Natural Language Processing (NLP) Basics:",
          "  • Text Preprocessing: Tokenization, Stemming, Lemmatization",
          "  • Bag-of-Words & TF-IDF Representations",
          "  • Word Embeddings: Word2Vec, GloVe",
          "  • Sentiment Analysis as a practical NLP application",
        ],
        quiz: [
          {
            question:
              "How does K-Means Clustering work?",
            options: [
              "It partitions data into k groups by minimizing distance to cluster centroids",
              "It uses labeled data to classify points",
              "It predicts continuous values from features",
            ],
            answer:
              "It partitions data into k groups by minimizing distance to cluster centroids",
          },
          {
            question:
              "What does PCA (Principal Component Analysis) achieve?",
            options: [
              "Reduces the number of features while retaining maximum variance",
              "Increases the number of features for better accuracy",
              "Assigns labels to unlabeled data",
            ],
            answer:
              "Reduces the number of features while retaining maximum variance",
          },
          {
            question:
              "What is the key idea behind Random Forest?",
            options: [
              "Combine many decision trees (bagging) to improve accuracy and reduce overfitting",
              "Use a single deep decision tree for predictions",
              "Apply k-means clustering on tree nodes",
            ],
            answer:
              "Combine many decision trees (bagging) to improve accuracy and reduce overfitting",
          },
          {
            question:
              "What is Backpropagation in neural networks?",
            options: [
              "An algorithm that calculates gradients to update weights and minimize loss",
              "A method to collect more training data",
              "A technique to remove hidden layers",
            ],
            answer:
              "An algorithm that calculates gradients to update weights and minimize loss",
          },
          {
            question:
              "What does TF-IDF measure in NLP?",
            options: [
              "How important a word is in a document relative to the entire corpus",
              "The physical size of a text file",
              "The number of sentences in a paragraph",
            ],
            answer:
              "How important a word is in a document relative to the entire corpus",
          },
        ],
        miniGame: {
          type: "wordScramble",
          title: "🔤 Unscramble ML Words!",
          instruction: "Click the letters in the right order to spell the ML word!",
          words: [
            { scrambled: "RTCUELS", answer: "CLUSTER", hint: "Groups of similar data" },
            { scrambled: "RNUONE", answer: "NEURON", hint: "Building block of neural networks" },
            { scrambled: "OLPDEE NAGLIREN", answer: "DEEP LEARNING", hint: "Neural networks with many layers" },
            { scrambled: "BNOGSOTI", answer: "BOOSTING", hint: "Combining weak learners" },
          ],
        },
      },

      /* ===== Unit 5: ML in Practice – Deployment, Ethics & Real-World Applications ===== */
      {
        id: 5,
        title: "Future of AI and Smart Technology",
        video: "/videos/MLU5.mp4",
        videoHindi: "/videos/MLU5_hindi.mp4",
        description:
          "Model deployment, MLOps, ethical considerations, bias, and real-world ML applications.",
        topics: [
          "Model Deployment:",
          "  • Saving & Loading Models (Pickle, Joblib, ONNX)",
          "  • REST APIs for Model Serving (Flask, FastAPI)",
          "  • Containerization Basics (Docker for ML)",
          "MLOps Fundamentals:",
          "  • ML Pipelines: Automated Training, Testing, Deployment",
          "  • Experiment Tracking (MLflow, Weights & Biases)",
          "  • Model Monitoring: Data Drift & Model Drift Detection",
          "  • CI/CD for Machine Learning",
          "Ethics & Bias in ML:",
          "  • Sources of Bias: Data Bias, Algorithmic Bias, Confirmation Bias",
          "  • Fairness Metrics & Bias Mitigation Techniques",
          "  • Transparency & Explainability (SHAP, LIME)",
          "  • Privacy: Differential Privacy, Federated Learning concepts",
          "  • Responsible AI Principles & Governance",
          "Real-World Applications & Case Studies:",
          "  • Recommendation Systems (Collaborative & Content-Based Filtering)",
          "  • Fraud Detection, Medical Diagnosis, Autonomous Vehicles",
          "  • Time Series Forecasting (ARIMA, Prophet overview)",
          "  • Anomaly Detection in production systems",
        ],
        quiz: [
          {
            question:
              "What is the purpose of MLOps?",
            options: [
              "Streamline and automate the lifecycle of ML models from development to production",
              "Only train models faster on GPUs",
              "Replace data scientists with automation",
            ],
            answer:
              "Streamline and automate the lifecycle of ML models from development to production",
          },
          {
            question:
              "What is Data Drift?",
            options: [
              "When the statistical properties of incoming data change over time, degrading model performance",
              "When the model gets faster over time",
              "When training data is duplicated accidentally",
            ],
            answer:
              "When the statistical properties of incoming data change over time, degrading model performance",
          },
          {
            question:
              "Why is bias in ML a concern?",
            options: [
              "Biased models can produce unfair or discriminatory outcomes that harm certain groups",
              "Bias always makes models more accurate",
              "Bias only affects image models, not text models",
            ],
            answer:
              "Biased models can produce unfair or discriminatory outcomes that harm certain groups",
          },
          {
            question:
              "What do SHAP and LIME help with?",
            options: [
              "Explaining and interpreting individual model predictions",
              "Compressing large datasets",
              "Generating synthetic training data",
            ],
            answer:
              "Explaining and interpreting individual model predictions",
          },
        ],
        miniGame: {
          type: "match",
          title: "🧩 Match ML Concepts!",
          instruction: "Click a term, then click its meaning!",
          pairs: [
            { term: "MLOps", definition: "Automating the ML lifecycle" },
            { term: "Data Drift", definition: "Data changes over time" },
            { term: "SHAP", definition: "Explains model predictions" },
            { term: "Bias", definition: "Unfair outcomes from models" },
          ],
        },
      },
    ],
  },

  {
    class: "robotics",
    title: "Robotics",
    modules: [
      {
        id: 1,
        title: "What is a Robot?",
        video: "/videos/ROU1.mp4",
        videoHindi: "/videos/ROU1_hindi.mp4",
        quiz: [
          {
            question: "What is the primary purpose of a robot?",
            options: ["Entertainment", "Automation", "Decoration"],
            answer: "Automation",
          },
          {
            question: "A robot is a machine that can _____.",
            options: [
              "Sense, think, and act on its own or with guidance",
              "Only sit in one place",
              "Only make sounds",
            ],
            answer: "Sense, think, and act on its own or with guidance",
          },
          {
            question: "Which of these is a real robot?",
            options: [
              "A robotic vacuum cleaner like Roomba",
              "A stuffed toy animal",
              "A regular bicycle",
            ],
            answer: "A robotic vacuum cleaner like Roomba",
          },
          {
            question: "What makes a robot different from a regular machine?",
            options: [
              "A robot can be programmed to make decisions and respond to its environment",
              "A robot is always shaped like a human",
              "A robot runs on batteries only",
            ],
            answer: "A robot can be programmed to make decisions and respond to its environment",
          },
          {
            question: "The word 'robot' originally comes from a Czech word meaning _____.",
            options: [
              "Forced labor or work",
              "Metal friend",
              "Fast machine",
            ],
            answer: "Forced labor or work",
          },
        ],
        miniGame: {
          type: "wordScramble",
          title: "🔤 Unscramble Robot Words!",
          instruction: "Click the letters in the right order to spell the word!",
          words: [
            { scrambled: "TOORB", answer: "ROBOT", hint: "A machine that can sense, think, and act" },
            { scrambled: "SNSROE", answer: "SENSOR", hint: "Helps a robot detect things" },
            { scrambled: "ROTAMAUOIN", answer: "AUTOMATION", hint: "Doing tasks without humans" },
            { scrambled: "GROAPMR", answer: "PROGRAM", hint: "Instructions a robot follows" },
          ],
        },
      },
      {
        id: 2,
        title: "Robot Parts",
        video: "/videos/Sheen_English.mp4",
        videoHindi: "/videos/Sheen_Hindi.mp4",
        quiz: [
          {
            question: "Which part senses the environment?",
            options: ["Actuator", "Sensor", "Controller"],
            answer: "Sensor",
          },
          {
            question: "What does an actuator do in a robot?",
            options: [
              "It creates movement — like motors that spin wheels or move arms",
              "It stores data",
              "It charges the battery",
            ],
            answer: "It creates movement — like motors that spin wheels or move arms",
          },
          {
            question: "The 'brain' of a robot is usually a _____.",
            options: [
              "Microcontroller or computer processor",
              "Battery",
              "Wheel",
            ],
            answer: "Microcontroller or computer processor",
          },
          {
            question: "Which part provides energy to a robot?",
            options: [
              "Power source (battery or electricity)",
              "Sensor",
              "Camera only",
            ],
            answer: "Power source (battery or electricity)",
          },
          {
            question: "An end effector is the part of a robot that _____.",
            options: [
              "Interacts with objects — like a gripper or tool",
              "Thinks and makes decisions",
              "Connects to Wi-Fi",
            ],
            answer: "Interacts with objects — like a gripper or tool",
          },
        ],
      },
      {
        id: 3,
        title: "Robots around us",
        video: "/videos/Robotics3.mp4",
        videoHindi: "/videos/Robotics3_hindi.mp4",
        quiz: [
          {
            question: "Which is a robot in daily life?",
            options: ["Vacuum Cleaner", "Microwave", "Fan"],
            answer: "Vacuum Cleaner",
          },
          {
            question: "Robots in factories are mainly used for _____.",
            options: [
              "Assembling products on a production line",
              "Cooking lunch for workers",
              "Decorating the walls",
            ],
            answer: "Assembling products on a production line",
          },
          {
            question: "Which of these uses robots in healthcare?",
            options: [
              "Surgical robots that help doctors perform precise operations",
              "Hospital cafeteria menus",
              "Patient waiting room chairs",
            ],
            answer: "Surgical robots that help doctors perform precise operations",
          },
          {
            question: "Self-driving cars are an example of _____.",
            options: [
              "Robots that use sensors and AI to navigate roads",
              "Regular cars with no technology",
              "Toy cars for children",
            ],
            answer: "Robots that use sensors and AI to navigate roads",
          },
          {
            question: "Drones are robots that _____.",
            options: [
              "Can fly and are used for delivery, photography, and rescue",
              "Can only swim underwater",
              "Are always the size of an airplane",
            ],
            answer: "Can fly and are used for delivery, photography, and rescue",
          },
        ],
        miniGame: {
          type: "sortBuckets",
          title: "🗂️ Where Do These Robots Work?",
          instruction: "Sort each robot into where it's mainly used!",
          buckets: ["Home", "Hospital", "Factory"],
          items: [
            { text: "Roomba vacuum", bucket: "Home" },
            { text: "Surgical robot", bucket: "Hospital" },
            { text: "Assembly line arm", bucket: "Factory" },
            { text: "Smart thermostat", bucket: "Home" },
            { text: "Medicine delivery bot", bucket: "Hospital" },
            { text: "Welding robot", bucket: "Factory" },
          ],
        },
      },
      {
        id: 4,
        title: "Sensors and How Robots Sense",
        video: "/videos/Robotics4.mp4",
        videoHindi: "/videos/Robotics4_hindi.mp4",
        quiz: [
          {
            question: "Sensors are used to?",
            options: ["Collect Data", "Cook Food", "Paint Walls"],
            answer: "Collect Data",
          },
          {
            question: "An ultrasonic sensor helps a robot _____.",
            options: [
              "Measure distance to objects using sound waves",
              "See in color like human eyes",
              "Taste food ingredients",
            ],
            answer: "Measure distance to objects using sound waves",
          },
          {
            question: "A temperature sensor detects _____.",
            options: [
              "How hot or cold something is",
              "How loud a sound is",
              "What color an object is",
            ],
            answer: "How hot or cold something is",
          },
          {
            question: "Which sensor helps a robot see?",
            options: [
              "Camera or image sensor",
              "Pressure sensor",
              "Humidity sensor",
            ],
            answer: "Camera or image sensor",
          },
          {
            question: "An infrared (IR) sensor can help a robot _____.",
            options: [
              "Detect objects and follow lines on the ground",
              "Connect to the internet",
              "Play music",
            ],
            answer: "Detect objects and follow lines on the ground",
          },
        ],
        miniGame: {
          type: "match",
          title: "🧩 Match Sensors!",
          instruction: "Click a sensor, then click what it detects!",
          pairs: [
            { term: "Ultrasonic", definition: "Measures distance with sound" },
            { term: "Camera", definition: "Sees images and video" },
            { term: "Temperature", definition: "Detects hot or cold" },
            { term: "Infrared (IR)", definition: "Follows lines & detects objects" },
          ],
        },
      },
      {
        id: 5,
        title: "Simple Robot Projects for Beginners",
        video: "/videos/Robotics5.mp4",
        videoHindi: "/videos/Robotics5_hindi.mp4",
        quiz: [
          {
            question: "A simple robot project?",
            options: [
              "Line Follower Robot",
              "Smartphone App",
              "Blog Website",
            ],
            answer: "Line Follower Robot",
          },
          {
            question: "A line follower robot uses _____ to stay on track.",
            options: [
              "Infrared sensors that detect light and dark surfaces",
              "GPS satellites",
              "Voice commands from a person",
            ],
            answer: "Infrared sensors that detect light and dark surfaces",
          },
          {
            question: "Arduino is a popular _____ used in beginner robot projects.",
            options: [
              "Microcontroller board",
              "Type of battery",
              "Programming language only",
            ],
            answer: "Microcontroller board",
          },
          {
            question: "An obstacle-avoiding robot uses sensors to _____.",
            options: [
              "Detect objects in its path and change direction",
              "Play music when it hits something",
              "Speed up when it sees a wall",
            ],
            answer: "Detect objects in its path and change direction",
          },
          {
            question: "What programming skill is useful for building robots?",
            options: [
              "Writing code to control sensors and motors (like C++ or Python)",
              "Only drawing pictures",
              "Typing speed",
            ],
            answer: "Writing code to control sensors and motors (like C++ or Python)",
          },
        ],
        miniGame: {
          type: "trueFalse",
          title: "⚡ Robot Projects: True or False?",
          instruction: "Are these statements about robot projects true or false?",
          statements: [
            { text: "A line follower robot uses infrared sensors.", answer: true },
            { text: "Arduino is a type of battery.", answer: false },
            { text: "Obstacle-avoiding robots detect things in their path.", answer: true },
            { text: "You need to know coding to build robots.", answer: true },
            { text: "Robots can only be programmed in English.", answer: false },
          ],
        },
      },

    ],
  },
];