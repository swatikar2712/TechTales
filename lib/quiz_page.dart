import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'main.dart'; // to access ApiConfig
import 'game_page.dart'; // ✅ added this import

class QuizPage extends StatefulWidget {
  final String theme;
  const QuizPage({super.key, required this.theme});

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  bool isLoading = true;
  List<dynamic> questions = [];
  int currentQuestion = 0;
  int score = 0;

  @override
  void initState() {
    super.initState();
    fetchQuiz();
  }

  Future<void> fetchQuiz() async {
    try {
      final response = await http.post(
        Uri.parse('${ApiConfig.baseUrl}/get_quiz'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'theme': widget.theme}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        debugPrint('QUIZ RESPONSE: ${data.toString()}'); // 👈 debug

        if (data['success']) {
          setState(() {
            questions = data['quiz']['questions'];
            isLoading = false;
          });
        } else {
          throw Exception('No quiz found');
        }
      } else {
        throw Exception('Server error');
      }
    } catch (e) {
      setState(() {
        isLoading = false;
        questions = [];
      });
      debugPrint('Error fetching quiz: $e');
    }
  }

  void _answerQuestion(String selectedOption) {
    final question = questions[currentQuestion];

    // --- Handle case where "answer" might be a list or string ---
    final rawAnswer = question['answer'];
    final correctAnswerText = (rawAnswer is List && rawAnswer.isNotEmpty)
        ? rawAnswer[0].toString()
        : rawAnswer.toString();

    // --- Strong normalization ---
    String normalize(String text) {
      return text
          .toLowerCase()
          .trim()
          .replaceAll(RegExp(r'^[a-d]\)\s*'), '') // remove "a)", "b)", etc.
          .replaceAll(RegExp(r'[\u0000-\u001F\u007F]'), '') // control chars
          .replaceAll(RegExp(r'[\u200B-\u200F\uFEFF\u202A-\u202E]'), '') // hidden Unicode
          .replaceAll(RegExp(r'[“”"‘’]'), '') // fancy quotes
          .replaceAll(RegExp(r'\s+'), ' '); // collapse spaces
    }

    final selected = normalize(selectedOption);
    final correct = normalize(correctAnswerText);

    debugPrint('-------------------------------');
    debugPrint('Selected Option: "$selectedOption"');
    debugPrint('Correct Answer Raw: "$rawAnswer"');
    debugPrint('Selected (normalized): "$selected"');
    debugPrint('Correct (normalized): "$correct"');
    debugPrint('Match result: ${selected == correct}');
    debugPrint('-------------------------------');

    final isCorrect = selected == correct;
    if (isCorrect) score++;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          isCorrect
              ? '✅ Correct!'
              : '❌ Wrong! Correct answer: $correctAnswerText',
        ),
        duration: const Duration(seconds: 2),
      ),
    );

    if (currentQuestion < questions.length - 1) {
      setState(() => currentQuestion++);
    } else {
      _showResult();
    }
  }

  void _showResult() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) => AlertDialog(
        title: const Text('🎯 Quiz Completed!'),
        content: Text('Your score: $score / ${questions.length}'),
        actions: [
          // ✅ Button to go to Game Zone
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.indigo,
              minimumSize: const Size(double.infinity, 45),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            icon: const Icon(Icons.videogame_asset_rounded, color: Colors.white),
            label: const Text(
              "Play AI Game 🎮",
              style: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              Navigator.pop(context); // close dialog
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => GamePage(unitKey: widget.theme),
                ),
              );
            },
          ),
          const SizedBox(height: 8),
          // Close button
          TextButton(
            onPressed: () {
              Navigator.pop(context); // close dialog
              Navigator.pop(context); // back to story/unit
            },
            child: const Text('Back to Topics'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (questions.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: Text('Quiz: ${widget.theme}')),
        body: const Center(child: Text('No quiz available for this topic.')),
      );
    }

    final question = questions[currentQuestion];

    return Scaffold(
      appBar: AppBar(
        title: Text('Quiz: ${widget.theme}'),
        backgroundColor: Colors.indigo,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Question ${currentQuestion + 1}/${questions.length}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Text(
              question['question'],
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 20),
            ...List.generate(
              (question['options'] as List).length,
              (index) {
                final option = question['options'][index];
                return Card(
                  margin: const EdgeInsets.symmetric(vertical: 6),
                  child: ListTile(
                    title: Text(option),
                    onTap: () => _answerQuestion(option),
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
