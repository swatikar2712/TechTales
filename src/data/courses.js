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
        ],
      },
      {
        id: 2,
        title: "AI VS Human Intelligence?",
        video: "/videos/Unit2.mp4",
        videoHindi: "/videos/Unit2_hindi.mp4",
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
        ],
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
        ],
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
        ],
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
        ],
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
        title: "Unit 1 – Foundations of Machine Learning",
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
      },

      /* ===== Unit 2: Data Preparation & Exploratory Analysis ===== */
      {
        id: 2,
        title: "Unit 2 – Data Preparation & Exploratory Analysis",
        video: "/videos/MLU2.mp4",
        videoHindi: "/videos/MLU2_hindi.mp4",
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
      },

      /* ===== Unit 3: Supervised Learning – Regression, Classification & Evaluation ===== */
      {
        id: 3,
        title: "Unit 3 – Supervised Learning: Regression, Classification & Evaluation",
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
      },

      /* ===== Unit 4: Unsupervised Learning, Ensembles & Deep Learning ===== */
      {
        id: 4,
        title: "Unit 4 – Unsupervised Learning, Ensembles & Deep Learning",
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
      },

      /* ===== Unit 5: ML in Practice – Deployment, Ethics & Real-World Applications ===== */
      {
        id: 5,
        title: "Unit 5 – ML in Practice: Deployment, Ethics & Real-World Applications",
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
        ],
      },
      {
        id: 2,
        title: "Robot Parts",
        video: "/videos/Robotics2.mp4",
        videoHindi: "/videos/Robotics2_hindi.mp4",
        quiz: [
          {
            question: "Which part senses the environment?",
            options: ["Actuator", "Sensor", "Controller"],
            answer: "Sensor",
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
        ],
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
        ],
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
        ],
      },
      {
        id: 6,
        title: "Robots Around Us",
        video: "/videos/Robotics6.mp4",
        videoHindi: "/videos/Robotics6_hindi.mp4",
        quiz: [
          {
            question: "Robots can be found in?",
            options: ["Factories", "Homes", "Both"],
            answer: "Both",
          },
        ],
      },
      {
        id: 7,
        title: "Fun Facts About Robots",
        video: "/videos/Robotics7.mp4",
        videoHindi: "/videos/Robotics7_hindi.mp4",
        quiz: [
          {
            question: "Robots can do which unusual task?",
            options: ["Play Chess", "Fly to Mars", "Both"],
            answer: "Both",
          },
        ],
      },
    ],
  },
];