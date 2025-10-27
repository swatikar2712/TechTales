import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:audioplayers/audioplayers.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await SharedPreferences.getInstance();
  runApp(TechTalesApp(prefs: prefs));
}

class TechTalesApp extends StatelessWidget {
  final SharedPreferences prefs;
  const TechTalesApp({super.key, required this.prefs});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TechTales',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        textTheme: const TextTheme(
          bodyMedium: TextStyle(fontSize: 16.0),
        ),
      ),
      home: SyllabusOverviewPage(prefs: prefs),
    );
  }
}

/// ------------------------------------------------------------
/// 1️⃣  SYLLABUS OVERVIEW PAGE
/// ------------------------------------------------------------
class SyllabusOverviewPage extends StatelessWidget {
  final SharedPreferences prefs;
  const SyllabusOverviewPage({super.key, required this.prefs});

  final List<Map<String, dynamic>> units = const [
    {
      "icon": Icons.psychology_alt_rounded,
      "title": "Unit 1: Introduction to AI",
      "subtitle": "What is AI? Understanding the basics",
      "color": Colors.deepPurple,
    },
    {
      "icon": Icons.smart_toy_rounded,
      "title": "Unit 2: Robotics",
      "subtitle": "How machines move and think",
      "color": Colors.teal,
    },
    {
      "icon": Icons.analytics_rounded,
      "title": "Unit 3: Machine Learning",
      "subtitle": "How computers learn from data",
      "color": Colors.orangeAccent,
    },
    {
      "icon": Icons.chat_rounded,
      "title": "Unit 4: Chatbots",
      "subtitle": "Conversations with machines",
      "color": Colors.blueAccent,
    },
    {
      "icon": Icons.public_rounded,
      "title": "Unit 5: AI for Good",
      "subtitle": "Ethics, environment & innovation",
      "color": Colors.green,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.deepPurple.shade50,
      appBar: AppBar(
        title: const Text('TechTales: AI, ML & Robotics'),
        centerTitle: true,
        elevation: 0,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: units.length,
        itemBuilder: (context, index) {
          final unit = units[index];
          return AnimatedContainer(
            duration: const Duration(milliseconds: 500),
            curve: Curves.easeOut,
            margin: const EdgeInsets.only(bottom: 16),
            decoration: BoxDecoration(
              color: unit["color"].withOpacity(0.1),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: unit["color"], width: 1.5),
            ),
            child: ListTile(
              leading: CircleAvatar(
                radius: 26,
                backgroundColor: unit["color"].withOpacity(0.2),
                child: Icon(unit["icon"], color: unit["color"], size: 30),
              ),
              title: Text(
                unit["title"],
                style: TextStyle(
                    color: unit["color"],
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
              subtitle: Text(
                unit["subtitle"],
                style: const TextStyle(color: Colors.black87, fontSize: 14),
              ),
              trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 20),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => TopicSelectionPage(
                      unitName: unit["title"],
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
/// 2️⃣  TOPIC SELECTION PAGE (Dummy Example)
/// ------------------------------------------------------------
class TopicSelectionPage extends StatelessWidget {
  final String unitName;
  final SharedPreferences prefs;

  const TopicSelectionPage(
      {super.key, required this.unitName, required this.prefs});

  @override
  Widget build(BuildContext context) {
    final List<String> topics = [
      'Chotu Learns Fruits 🍎',
      'Robot Helpers 🤖',
      'Chat with AI 💬',
      'Smart Predictions 📊',
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text(unitName),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: topics.length,
        itemBuilder: (context, index) {
          return Card(
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            color: Colors.white,
            margin: const EdgeInsets.only(bottom: 16),
            elevation: 4,
            child: ListTile(
              leading: const Icon(Icons.auto_stories_rounded,
                  color: Colors.deepPurple),
              title: Text(topics[index]),
              trailing:
                  const Icon(Icons.play_arrow_rounded, color: Colors.deepPurple),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => StoryPage(
                      title: topics[index],
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

class StoryPage extends StatefulWidget {
  final String title;
  const StoryPage({super.key, required this.title});

  @override
  State<StoryPage> createState() => _StoryPageState();
}

class _StoryPageState extends State<StoryPage> {
  final AudioPlayer _player = AudioPlayer();
  bool isPlaying = false;

  Future<void> _toggleAudio() async {
    try {
      if (isPlaying) {
        await _player.stop();
        setState(() => isPlaying = false);
      } else {
        await _player.play(AssetSource('audio/chotu_learns_fruits.mp3'));
        setState(() => isPlaying = true);
      }
    } catch (e) {
      debugPrint('Error playing audio: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Could not play audio. Please try again.'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _player.onPlayerComplete.listen((event) {
      if (mounted) {
        setState(() {
          isPlaying = false;
        });
      }
    });
  }

  @override
  void dispose() {
    _player.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.deepPurple.shade50,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const SingleChildScrollView(
                  child: Text(
                    "Once upon a time, Chotu the robot wanted to learn how to tell apples from bananas. His teacher showed him pictures of fruits — and slowly, Chotu learned by observing patterns. This is how machines learn from examples — called Machine Learning!",
                    style: TextStyle(fontSize: 18, height: 1.5),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),
            FloatingActionButton.extended(
              onPressed: _toggleAudio,
              backgroundColor: Colors.deepPurple,
              icon: Icon(isPlaying ? Icons.stop : Icons.play_arrow),
              label: Text(isPlaying ? "Stop Narration" : "Play Narration"),
            ),
          ],
        ),
      ),
    );
  }
}
