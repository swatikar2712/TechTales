import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'quiz_page.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'saved_stories.dart';

/// 🌐 API Configuration
/// ------------------------------------------------------------
class ApiConfig {
  static const String baseUrl = 'http://192.168.121.24:8000';
}
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 🔵 Initialize Hive database
  await Hive.initFlutter();
  await Hive.openBox('stories'); // <--- NEW STORAGE BOX

  // Your old SharedPreferences stays
  final prefs = await SharedPreferences.getInstance();

  runApp(AITalesApp(prefs: prefs));
}
//void main() async {
  //WidgetsFlutterBinding.ensureInitialized();
  //final prefs = await SharedPreferences.getInstance();
  //runApp(AITalesApp(prefs: prefs));
//}

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
        scaffoldBackgroundColor: Colors.indigo.shade50,
        fontFamily: 'ComicSans', // playful, kid-friendly font
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
/// 1️⃣ SYLLABUS OVERVIEW PAGE (AI Units)
/// ------------------------------------------------------------
class AISyllabusPage extends StatelessWidget {
  final SharedPreferences prefs;
  const AISyllabusPage({super.key, required this.prefs});

  final List<Map<String, dynamic>> units = const [
    {
      "icon": Icons.lightbulb_outline_rounded,
      "title": "Unit 1: Introduction to AI",
      "subtitle": "What is AI and where do we see it around us?",
      "color": Colors.deepPurple,
      "unitKey": "Introduction to AI",
    },
    {
      "icon": Icons.home_rounded,
      "title": "Unit 2: Dream Smart Home",
      "subtitle": "Design your own AI-powered dream home!",
      "color": Colors.orangeAccent,
      "unitKey": "Dream Smart Home",
    },
    {
      "icon": Icons.games_rounded,
      "title": "Unit 3: The AI Games",
      "subtitle": "Learn AI through fun games: Data, NLP, and Vision!",
      "color": Colors.teal,
      "unitKey": "AI Games",
    },
    {
      "icon": Icons.school_rounded,
      "title": "Unit 4: Smart Cities and Schools",
      "subtitle": "How AI is making our world smarter",
      "color": Colors.blueAccent,
      "unitKey": "Smart Cities",
    },
    {
      "icon": Icons.public_rounded,
      "title": "Unit 5: AI and Sustainability",
      "subtitle": "AI helping the planet and Sustainable Development Goals",
      "color": Colors.green,
      "unitKey": "AI and SDGs",
    },
    {
      "icon": Icons.cases_rounded,
      "title": "Unit 6: AI in the Real World",
      "subtitle": "Case studies and AI-powered startups",
      "color": Colors.pinkAccent,
      "unitKey": "AI Case Studies",
    },
    {
      "icon": Icons.balance_rounded,
      "title": "Unit 7: AI Ethics and Bias",
      "subtitle": "Making fair and responsible AI decisions",
      "color": Colors.amber,
      "unitKey": "AI Ethics and Bias",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
appBar: AppBar(
  title: const Text('AITales: Learn, Imagine & Create'),
  centerTitle: true,
  backgroundColor: Colors.indigo,
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
            elevation: 6,
            color: unit["color"].withOpacity(0.1),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18),
            ),
            margin: const EdgeInsets.only(bottom: 16),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: unit["color"].withOpacity(0.3),
                radius: 26,
                child: Icon(unit["icon"], color: unit["color"], size: 30),
              ),
              title: Text(
                unit["title"],
                style: TextStyle(
                  color: unit["color"],
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                ),
              ),
              subtitle: Text(unit["subtitle"]),
              trailing: const Icon(Icons.arrow_forward_ios_rounded,
                  color: Colors.indigo),
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
/// 2️⃣ TOPIC SELECTION PAGE
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

  List<String> _getTopics(String unitKey) {
    switch (unitKey) {
      case "Introduction to AI":
        return [
          "What is Artificial Intelligence?",
          "AI Around Us: Examples from Daily Life",
          "AI vs Human Intelligence",
        ];
      case "Dream Smart Home":
        return [
          "Design Your Smart Home",
          "How AI Makes Homes Smarter",
          "Devices That Think: Smart Lights, Speakers, and More",
        ];
      case "AI Games":
        return [
          "Rock Paper Scissors – AI Learns Your Moves!",
          "Mystery Animal – Talking to Computers (NLP)",
          "Emoji Scavenger Hunt – Vision that Sees!",
        ];
      case "Smart Cities":
        return [
          "Smart Schools and Smart Cities",
          "How AI Helps in Traffic, Waste, and Safety",
          "Story: Robo Visits a Smart School",
        ];
      case "AI and SDGs":
        return [
          "What are Sustainable Development Goals?",
          "AI for Clean Water and Climate",
          "How Robots Help Save Nature",
        ];
      case "AI Case Studies":
        return [
          "Inspiring Startups Using AI",
          "Jobs of the Future – AI at Work",
          "Design Your AI Dream Job",
        ];
      case "AI Ethics and Bias":
        return [
          "What is Ethical AI?",
          "Can AI Make Mistakes? Understanding Bias",
          "Debate: Is AI a Friend or a Foe?",
        ];
      default:
        return ["Learn about Artificial Intelligence!"];
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
              borderRadius: BorderRadius.circular(16),
            ),
            margin: const EdgeInsets.only(bottom: 16),
            child: ListTile(
              leading: const Icon(Icons.auto_stories, color: Colors.indigo),
              title: Text(topics[index]),
              trailing:
                  const Icon(Icons.play_arrow_rounded, color: Colors.indigo),
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
/// 3️⃣ STORY PAGE — FUN READING EXPERIENCE + QUIZ BUTTON + IMAGES
/// ------------------------------------------------------------
class StoryPage extends StatefulWidget {
  final String title;
  final String unitKey;
  const StoryPage({super.key, required this.title, required this.unitKey});

  @override
  State<StoryPage> createState() => _StoryPageState();
}

class _StoryPageState extends State<StoryPage> {
  final AudioPlayer _player = AudioPlayer();
  bool isPlaying = false;
  bool isLoading = true;
  String storyText = '';
  String? errorMessage;
  List<String> imagesBase64 = [];

  @override
  void initState() {
    super.initState();
    _loadStory();
  }

  Future<void> _loadStory() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
      imagesBase64 = [];
    });

    try {
      final data = await ApiService.generateStory(
        topic: widget.title,
        unit: widget.unitKey,
      );
      setState(() {
        storyText = data['story'] ?? '';
        imagesBase64 =
            (data['images'] as List<dynamic>?)?.cast<String>() ?? [];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        errorMessage = e.toString();
        storyText =
            "Once upon a time, Riya and Arjun met Robo the Robot who loved to learn AI. This is a demo story — please check your backend connection.";
        isLoading = false;
      });
    }
  }

  @override
void dispose() {
  _player.dispose();   // keep if still needed elsewhere
  super.dispose();
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
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.indigo.shade50,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.indigo.shade100,
                      blurRadius: 6,
                      offset: const Offset(2, 2),
                    )
                  ],
                ),
                child: isLoading
                    ? const Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CircularProgressIndicator(),
                            SizedBox(height: 12),
                            Text('Generating your AI story...'),
                          ],
                        ),
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
                                color: Colors.black87,
                              ),
                            ),
                            const SizedBox(height: 16),
                            if (imagesBase64.isNotEmpty)
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: imagesBase64.map((img) {
                                  return Padding(
                                    padding:
                                        const EdgeInsets.symmetric(vertical: 8),
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
if (!isLoading)
  ElevatedButton.icon(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.green,
      minimumSize: const Size(double.infinity, 50),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    icon: const Icon(Icons.bookmark_add, color: Colors.white),
    label: const Text(
      "Save This Story",
      style: TextStyle(color: Colors.white, fontSize: 16),
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
        const SnackBar(content: Text("Story saved successfully!")),
      );
    },
  ),

const SizedBox(height: 12),

if (!isLoading)
  ElevatedButton.icon(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.indigo,
      minimumSize: const Size(double.infinity, 50),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    icon: const Icon(Icons.quiz_rounded, color: Colors.white),
    label: const Text(
      "Take Quiz for this Topic",
      style: TextStyle(color: Colors.white, fontSize: 16),
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
         ],
        ),
      ),
    );
  }
}































// import 'package:flutter/material.dart';
// import 'package:shared_preferences/shared_preferences.dart';
// import 'package:audioplayers/audioplayers.dart';
// import 'package:http/http.dart' as http;
// import 'dart:convert';
// import 'quiz_page.dart';


// /// ------------------------------------------------------------
// /// 🌐 API Configurationmai
// /// ------------------------------------------------------------
// class ApiConfig {
//   static const String baseUrl = 'http://192.168.121.24:8000';
// }

// void main() async {
//   WidgetsFlutterBinding.ensureInitialized();
//   final prefs = await SharedPreferences.getInstance();
//   runApp(AITalesApp(prefs: prefs));
// }

// /// ------------------------------------------------------------
// /// 🌈 APP ROOT
// /// ------------------------------------------------------------
// class AITalesApp extends StatelessWidget {
//   final SharedPreferences prefs;
//   const AITalesApp({super.key, required this.prefs});

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'AITales',
//       debugShowCheckedModeBanner: false,
//       theme: ThemeData(
//         primarySwatch: Colors.indigo,
//         scaffoldBackgroundColor: Colors.indigo.shade50,
//         fontFamily: 'ComicSans', // playful, kid-friendly font
//       ),
//       home: AISyllabusPage(prefs: prefs),
//     );
//   }
// }

// /// ------------------------------------------------------------
// /// 🧠 API Service Class
// /// ------------------------------------------------------------
// class ApiService {
//   static Future<String> generateStory({
//     required String topic,
//     required String unit,
//   }) async {
//     try {
//       final response = await http.post(
//         Uri.parse('${ApiConfig.baseUrl}/generate_story'),
//         headers: {'Content-Type': 'application/json'},
//         body: jsonEncode({
//           'query':
//               '$topic related to $unit for grade 5 students. Make it fun, simple, and educational about AI.',
//         }),
//       );

//       if (response.statusCode == 200) {
//         final data = jsonDecode(response.body);
//         if (data['success']) return data['story'];
//         throw Exception(data['error'] ?? 'Failed to generate story');
//       } else {
//         throw Exception('Server error: ${response.statusCode}');
//       }
//     } catch (e) {
//       throw Exception('Error connecting to server: $e');
//     }
//   }
// }

// /// ------------------------------------------------------------
// /// 1️⃣ SYLLABUS OVERVIEW PAGE (AI Units)
// /// ------------------------------------------------------------
// class AISyllabusPage extends StatelessWidget {
//   final SharedPreferences prefs;
//   const AISyllabusPage({super.key, required this.prefs});

//   final List<Map<String, dynamic>> units = const [
//     {
//       "icon": Icons.lightbulb_outline_rounded,
//       "title": "Unit 1: Introduction to AI",
//       "subtitle": "What is AI and where do we see it around us?",
//       "color": Colors.deepPurple,
//       "unitKey": "Introduction to AI",
//     },
//     {
//       "icon": Icons.home_rounded,
//       "title": "Unit 2: Dream Smart Home",
//       "subtitle": "Design your own AI-powered dream home!",
//       "color": Colors.orangeAccent,
//       "unitKey": "Dream Smart Home",
//     },
//     {
//       "icon": Icons.games_rounded,
//       "title": "Unit 3: The AI Games",
//       "subtitle": "Learn AI through fun games: Data, NLP, and Vision!",
//       "color": Colors.teal,
//       "unitKey": "AI Games",
//     },
//     {
//       "icon": Icons.school_rounded,
//       "title": "Unit 4: Smart Cities and Schools",
//       "subtitle": "How AI is making our world smarter",
//       "color": Colors.blueAccent,
//       "unitKey": "Smart Cities",
//     },
//     {
//       "icon": Icons.public_rounded,
//       "title": "Unit 5: AI and Sustainability",
//       "subtitle": "AI helping the planet and Sustainable Development Goals",
//       "color": Colors.green,
//       "unitKey": "AI and SDGs",
//     },
//     {
//       "icon": Icons.cases_rounded,
//       "title": "Unit 6: AI in the Real World",
//       "subtitle": "Case studies and AI-powered startups",
//       "color": Colors.pinkAccent,
//       "unitKey": "AI Case Studies",
//     },
//     {
//       "icon": Icons.balance_rounded,
//       "title": "Unit 7: AI Ethics and Bias",
//       "subtitle": "Making fair and responsible AI decisions",
//       "color": Colors.amber,
//       "unitKey": "AI Ethics and Bias",
//     },
//   ];

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('AITales: Learn, Imagine & Create'),
//         centerTitle: true,
//         backgroundColor: Colors.indigo,
//       ),
//       body: ListView.builder(
//         padding: const EdgeInsets.all(16),
//         itemCount: units.length,
//         itemBuilder: (context, index) {
//           final unit = units[index];
//           return Card(
//             elevation: 6,
//             color: unit["color"].withOpacity(0.1),
//             shape: RoundedRectangleBorder(
//               borderRadius: BorderRadius.circular(18),
//             ),
//             margin: const EdgeInsets.only(bottom: 16),
//             child: ListTile(
//               leading: CircleAvatar(
//                 backgroundColor: unit["color"].withOpacity(0.3),
//                 radius: 26,
//                 child: Icon(unit["icon"], color: unit["color"], size: 30),
//               ),
//               title: Text(
//                 unit["title"],
//                 style: TextStyle(
//                   color: unit["color"],
//                   fontWeight: FontWeight.bold,
//                   fontSize: 18,
//                 ),
//               ),
//               subtitle: Text(unit["subtitle"]),
//               trailing: const Icon(Icons.arrow_forward_ios_rounded,
//                   color: Colors.indigo),
//               onTap: () {
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (_) => TopicSelectionPage(
//                       unitName: unit["title"],
//                       unitKey: unit["unitKey"],
//                       prefs: prefs,
//                     ),
//                   ),
//                 );
//               },
//             ),
//           );
//         },
//       ),
//     );
//   }
// }

// /// ------------------------------------------------------------
// /// 2️⃣ TOPIC SELECTION PAGE
// /// ------------------------------------------------------------
// class TopicSelectionPage extends StatelessWidget {
//   final String unitName;
//   final String unitKey;
//   final SharedPreferences prefs;

//   const TopicSelectionPage({
//     super.key,
//     required this.unitName,
//     required this.unitKey,
//     required this.prefs,
//   });

//   List<String> _getTopics(String unitKey) {
//     switch (unitKey) {
//       case "Introduction to AI":
//         return [
//           "What is Artificial Intelligence?",
//           "AI Around Us: Examples from Daily Life",
//           "AI vs Human Intelligence",
//         ];
//       case "Dream Smart Home":
//         return [
//           "Design Your Smart Home",
//           "How AI Makes Homes Smarter",
//           "Devices That Think: Smart Lights, Speakers, and More",
//         ];
//       case "AI Games":
//         return [
//           "Rock Paper Scissors – AI Learns Your Moves!",
//           "Mystery Animal – Talking to Computers (NLP)",
//           "Emoji Scavenger Hunt – Vision that Sees!",
//         ];
//       case "Smart Cities":
//         return [
//           "Smart Schools and Smart Cities",
//           "How AI Helps in Traffic, Waste, and Safety",
//           "Story: Robo Visits a Smart School",
//         ];
//       case "AI and SDGs":
//         return [
//           "What are Sustainable Development Goals?",
//           "AI for Clean Water and Climate",
//           "How Robots Help Save Nature",
//         ];
//       case "AI Case Studies":
//         return [
//           "Inspiring Startups Using AI",
//           "Jobs of the Future – AI at Work",
//           "Design Your AI Dream Job",
//         ];
//       case "AI Ethics and Bias":
//         return [
//           "What is Ethical AI?",
//           "Can AI Make Mistakes? Understanding Bias",
//           "Debate: Is AI a Friend or a Foe?",
//         ];
//       default:
//         return ["Learn about Artificial Intelligence!"];
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     final topics = _getTopics(unitKey);

//     return Scaffold(
//       appBar: AppBar(
//         title: Text(unitName),
//         backgroundColor: Colors.indigo,
//       ),
//       body: ListView.builder(
//         padding: const EdgeInsets.all(16),
//         itemCount: topics.length,
//         itemBuilder: (context, index) {
//           return Card(
//             elevation: 4,
//             shape: RoundedRectangleBorder(
//               borderRadius: BorderRadius.circular(16),
//             ),
//             margin: const EdgeInsets.only(bottom: 16),
//             child: ListTile(
//               leading: const Icon(Icons.auto_stories, color: Colors.indigo),
//               title: Text(topics[index]),
//               trailing:
//                   const Icon(Icons.play_arrow_rounded, color: Colors.indigo),
//               onTap: () {
//                 Navigator.push(
//                   context,
//                   MaterialPageRoute(
//                     builder: (_) => StoryPage(
//                       title: topics[index],
//                       unitKey: unitKey,
//                     ),
//                   ),
//                 );
//               },
//             ),
//           );
//         },
//       ),
//     );
//   }
// }

// /// ------------------------------------------------------------
// /// 3️⃣ STORY PAGE — FUN READING EXPERIENCE + QUIZ BUTTON
// /// ------------------------------------------------------------

// class StoryPage extends StatefulWidget {
//   final String title;
//   final String unitKey;
//   const StoryPage({super.key, required this.title, required this.unitKey});

//   @override
//   State<StoryPage> createState() => _StoryPageState();
// }

// class _StoryPageState extends State<StoryPage> {
//   final AudioPlayer _player = AudioPlayer();
//   bool isPlaying = false;
//   bool isLoading = true;
//   String storyText = '';
//   String? errorMessage;

//   @override
//   void initState() {
//     super.initState();
//     _loadStory();
//   }

//   Future<void> _loadStory() async {
//     setState(() {
//       isLoading = true;
//       errorMessage = null;
//     });

//     try {
//       final story = await ApiService.generateStory(
//         topic: widget.title,
//         unit: widget.unitKey,
//       );
//       setState(() {
//         storyText = story;
//         isLoading = false;
//       });
//     } catch (e) {
//       setState(() {
//         errorMessage = e.toString();
//         storyText =
//             "Once upon a time, Riya and Arjun met Robo the Robot who loved to learn AI. This is a demo story — please check your backend connection.";
//         isLoading = false;
//       });
//     }
//   }

//   Future<void> _toggleAudio() async {
//     try {
//       if (isPlaying) {
//         await _player.stop();
//       } else {
//         await _player.play(AssetSource('audio/ai_story.mp3'));
//       }
//       setState(() => isPlaying = !isPlaying);
//     } catch (e) {
//       ScaffoldMessenger.of(context).showSnackBar(
//         const SnackBar(content: Text('Audio not available right now!')),
//       );
//     }
//   }

//   @override
//   void dispose() {
//     _player.dispose();
//     super.dispose();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text(widget.title),
//         backgroundColor: Colors.indigo,
//         actions: [
//           IconButton(
//             icon: const Icon(Icons.refresh),
//             onPressed: _loadStory,
//           ),
//         ],
//       ),
//       body: Padding(
//         padding: const EdgeInsets.all(20),
//         child: Column(
//           children: [
//             Expanded(
//               child: Container(
//                 padding: const EdgeInsets.all(20),
//                 decoration: BoxDecoration(
//                   color: Colors.indigo.shade50,
//                   borderRadius: BorderRadius.circular(16),
//                   boxShadow: [
//                     BoxShadow(
//                       color: Colors.indigo.shade100,
//                       blurRadius: 6,
//                       offset: const Offset(2, 2),
//                     )
//                   ],
//                 ),
//                 child: isLoading
//                     ? const Center(
//                         child: Column(
//                           mainAxisAlignment: MainAxisAlignment.center,
//                           children: [
//                             CircularProgressIndicator(),
//                             SizedBox(height: 12),
//                             Text('Generating your AI story...'),
//                           ],
//                         ),
//                       )
//                     : SingleChildScrollView(
//                         child: Text(
//                           storyText,
//                           style: const TextStyle(
//                             fontSize: 18,
//                             height: 1.5,
//                             color: Colors.black87,
//                           ),
//                         ),
//                       ),
//               ),
//             ),
//             const SizedBox(height: 20),
//             if (!isLoading)
//               ElevatedButton.icon(
//                 style: ElevatedButton.styleFrom(
//                   backgroundColor: Colors.indigo,
//                   minimumSize: const Size(double.infinity, 50),
//                   shape: RoundedRectangleBorder(
//                     borderRadius: BorderRadius.circular(12),
//                   ),
//                 ),
//                 icon: const Icon(Icons.quiz_rounded, color: Colors.white),
//                 label: const Text(
//                   "Take Quiz for this Topic",
//                   style: TextStyle(color: Colors.white, fontSize: 16),
//                 ),
//                 onPressed: () {
//                   Navigator.push(
//                     context,
//                     MaterialPageRoute(
//                       builder: (_) => QuizPage(theme: widget.unitKey),
//                     ),
//                   );
//                 },
//               ),
//           ],
//         ),
//       ),
//       floatingActionButton: FloatingActionButton.extended(
//         onPressed: _toggleAudio,
//         backgroundColor: Colors.indigo,
//         icon: Icon(isPlaying ? Icons.stop : Icons.volume_up),
//         label: Text(isPlaying ? 'Stop' : 'Listen'),
//       ),
//     );
//   }
// }
