import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'quiz_page.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'saved_stories.dart';

/// 🌐 API Configuration
class ApiConfig {
  static const String baseUrl = 'http://192.168.121.24:8000';
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Hive.initFlutter();
  await Hive.openBox('stories');

  final prefs = await SharedPreferences.getInstance();

  runApp(AITalesApp(prefs: prefs));
}

/// ------------------------------------------------------------
/// 🌈 APP ROOT
/// ------------------------------------------------------------
class AITalesApp extends StatelessWidget {
  final SharedPreferences prefs;
  const AITalesApp({super.key, required this.prefs});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AITales',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        scaffoldBackgroundColor: Colors.white,
        fontFamily: 'ComicSans',
      ),
      home: AISyllabusPage(prefs: prefs),
    );
  }
}

/// ------------------------------------------------------------
/// 🧠 API Service Class
/// ------------------------------------------------------------
class ApiService {
  static Future<Map<String, dynamic>> generateStory({
    required String topic,
    required String unit,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/generate_story'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'query':
              '$topic related to $unit for grade 5 students. Make it fun, simple, and educational about AI.',
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['success']) return data;
        throw Exception(data['error'] ?? 'Failed to generate story');
      } else {
        throw Exception('Server error: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error connecting to server: $e');
    }
  }
}

/// ------------------------------------------------------------
/// 1️⃣ SYLLABUS PAGE — CLEAN UI
/// ------------------------------------------------------------
class AISyllabusPage extends StatelessWidget {
  final SharedPreferences prefs;
  const AISyllabusPage({super.key, required this.prefs});

  final List<Map<String, dynamic>> units = const [
    {
      "icon": Icons.lightbulb_outline_rounded,
      "title": "Unit 1: Introduction to AI",
      "subtitle": "What is AI and where do we see it?",
      "color": Colors.deepPurple,
      "unitKey": "Introduction to AI",
    },
    {
      "icon": Icons.home_rounded,
      "title": "Unit 2: Dream Smart Home",
      "subtitle": "Design your own AI smart home!",
      "color": Colors.orange,
      "unitKey": "Dream Smart Home",
    },
    {
      "icon": Icons.games_rounded,
      "title": "Unit 3: The AI Games",
      "subtitle": "Learn AI through games!",
      "color": Colors.teal,
      "unitKey": "AI Games",
    },
    {
      "icon": Icons.school_rounded,
      "title": "Unit 4: Smart Cities",
      "subtitle": "How AI makes cities smarter",
      "color": Colors.blue,
      "unitKey": "Smart Cities",
    },
    {
      "icon": Icons.public_rounded,
      "title": "Unit 5: AI & Sustainability",
      "subtitle": "AI helping our planet",
      "color": Colors.green,
      "unitKey": "AI and SDGs",
    },
    {
      "icon": Icons.cases_rounded,
      "title": "Unit 6: AI in Real World",
      "subtitle": "Case studies & startups",
      "color": Colors.pink,
      "unitKey": "AI Case Studies",
    },
    {
      "icon": Icons.balance_rounded,
      "title": "Unit 7: AI Ethics",
      "subtitle": "Fair and responsible AI",
      "color": Colors.amber,
      "unitKey": "AI Ethics and Bias",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AITales'),
        backgroundColor: Colors.indigo,
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.book),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SavedStoriesPage()),
              );
            },
          )
        ],
      ),

      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: units.length,
        itemBuilder: (context, index) {
          final unit = units[index];

          return Card(
            elevation: 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            margin: const EdgeInsets.only(bottom: 16),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: unit["color"],
                child: Icon(unit["icon"], color: Colors.white),
              ),
              title: Text(
                unit["title"],
                style: TextStyle(
                  color: unit["color"],
                  fontWeight: FontWeight.bold,
                ),
              ),
              subtitle: Text(unit["subtitle"]),
              trailing: const Icon(Icons.arrow_forward_ios),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => TopicSelectionPage(
                      unitName: unit["title"],
                      unitKey: unit["unitKey"],
                      prefs: prefs,
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

/// ------------------------------------------------------------
/// 2️⃣ TOPIC SELECTION PAGE — CLEAN UI
/// ------------------------------------------------------------
class TopicSelectionPage extends StatelessWidget {
  final String unitName;
  final String unitKey;
  final SharedPreferences prefs;

  const TopicSelectionPage({
    super.key,
    required this.unitName,
    required this.unitKey,
    required this.prefs,
  });

  List<String> _getTopics(String key) {
    switch (key) {
      case "Introduction to AI":
        return [
          "What is Artificial Intelligence?",
          "AI Around Us",
          "AI vs Human Brain",
        ];
      case "Dream Smart Home":
        return [
          "Design Your Smart Home",
          "Smart Devices",
          "How AI Helps at Home",
        ];
      case "AI Games":
        return [
          "Rock Paper Scissors AI",
          "Talking to Computers",
          "Emoji Vision Game",
        ];
      case "Smart Cities":
      return [
        "What Makes a City Smart?",
        "AI in Urban Planning",
        "AI for Traffic Management",
        "AI and Sustainability in Cities",
      ];
      case "AI & Sustainability": 
      return [
        "AI for Climate Change",
        "AI for Clean Energy",
        "AI in Agriculture",
        "Sustainable AI Solutions",
      ];
      case "AI in Real World":
      return [
        "Successful AI Startups",
        "AI in Healthcare",
        "AI in Finance",
        "AI in Manufacturing",
      ];
      case "AI Ethics":
      return [
        "Ethical Challenges in AI",
        "Bias in AI Models",
        "Fairness in AI",
        "Responsible AI Development",
      ];
      default:
        return ["Learn about AI!"];
    }
  }

  @override
  Widget build(BuildContext context) {
    final topics = _getTopics(unitKey);

    return Scaffold(
      appBar: AppBar(
        title: Text(unitName),
        backgroundColor: Colors.indigo,
      ),

      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: topics.length,
        itemBuilder: (context, index) {
          return Card(
            elevation: 4,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            margin: const EdgeInsets.only(bottom: 16),
            child: ListTile(
              leading: const Icon(Icons.auto_stories, color: Colors.indigo),
              title: Text(topics[index]),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => StoryPage(
                      title: topics[index],
                      unitKey: unitKey,
                    ),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}

/// ------------------------------------------------------------
/// 3️⃣ STORY PAGE — CLEAN UI 
/// ------------------------------------------------------------
class StoryPage extends StatefulWidget {
  final String title;
  final String unitKey;
  const StoryPage({super.key, required this.title, required this.unitKey});

  @override
  State<StoryPage> createState() => _StoryPageState();
}

class _StoryPageState extends State<StoryPage> {
  bool isLoading = true;
  String storyText = '';
  List<String> imagesBase64 = [];

  @override
  void initState() {
    super.initState();
    _loadStory();
  }

  Future<void> _loadStory() async {
    setState(() => isLoading = true);

    try {
      final res = await ApiService.generateStory(
        topic: widget.title,
        unit: widget.unitKey,
      );

      setState(() {
        storyText = res["story"] ?? "";
        imagesBase64 = (res["images"] as List?)?.cast<String>() ?? [];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        storyText = "Sample Story (Backend Offline)";
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Colors.indigo,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _loadStory,
          )
        ],
      ),

      backgroundColor: Colors.white,

      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            /// STORY CONTAINER
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border.all(color: Colors.indigo.shade200, width: 1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: isLoading
                    ? const Center(
                        child: CircularProgressIndicator(),
                      )
                    : SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              storyText,
                              style: const TextStyle(
                                fontSize: 18,
                                height: 1.5,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(height: 15),

                            if (imagesBase64.isNotEmpty)
                              Column(
                                children: imagesBase64.map((img) {
                                  return Padding(
                                    padding:
                                        const EdgeInsets.only(bottom: 12),
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(12),
                                      child: Image.memory(
                                        base64Decode(img),
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                  );
                                }).toList(),
                              ),
                          ],
                        ),
                      ),
              ),
            ),

            const SizedBox(height: 20),

            /// SAVE BUTTON
            if (!isLoading)
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.bookmark_add, color: Colors.white),
                  label: const Text("Save Story",
                      style: TextStyle(fontSize: 16)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                  ),
                  onPressed: () async {
                    var box = Hive.box('stories');
                    await box.add({
                      "title": widget.title,
                      "unit": widget.unitKey,
                      "story": storyText,
                      "timestamp": DateTime.now().millisecondsSinceEpoch,
                    });

                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Story Saved!")),
                    );
                  },
                ),
              ),

            const SizedBox(height: 10),

            /// QUIZ BUTTON
            /// 
            /// 
            
            if (!isLoading)
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  icon: const Icon(Icons.quiz, color: Colors.white),
                  label: const Text(
                    "Take Quiz",
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white,   // <-- MAKE TEXT WHITE
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.indigo,
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => QuizPage(theme: widget.unitKey),
                      
           
                        
                      ),
                    );
                  },
                ),
              ),
          ],
        ),
      ),
    );
  }
}