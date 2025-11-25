import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:math';

class GamePage extends StatefulWidget {
  final String unitKey;
  const GamePage({super.key, required this.unitKey});

  @override
  State<GamePage> createState() => _GamePageState();
}

class _GamePageState extends State<GamePage> {
  List<String> _cardImages = [];
  List<bool> _flipped = [];
  List<bool> _matched = [];
  int? _firstIndex;
  bool _waiting = false;
  int _score = 0;

  @override
  void initState() {
    super.initState();
    _loadImages();
  }

  void _loadImages() {
    // You can replace these with your own AI-related images
    List<String> baseImages = [
      'assets/ai_images/robot.png',
      'assets/ai_images/brain.png',
      'assets/ai_images/chip.png',
      'assets/ai_images/smart_home.png',
      'assets/ai_images/satellite.png',
      'assets/ai_images/ai_eye.png',
    ];

    _cardImages = List.from(baseImages)..addAll(baseImages); // duplicate
    _cardImages.shuffle(Random());
    _flipped = List.generate(_cardImages.length, (_) => false);
    _matched = List.generate(_cardImages.length, (_) => false);
  }

  void _onCardTap(int index) {
    if (_waiting || _matched[index] || _flipped[index]) return;

    setState(() {
      _flipped[index] = true;
    });

    if (_firstIndex == null) {
      _firstIndex = index;
    } else {
      final first = _firstIndex!;
      _waiting = true;

      if (_cardImages[first] == _cardImages[index]) {
        Future.delayed(const Duration(milliseconds: 400), () {
          setState(() {
            _matched[first] = true;
            _matched[index] = true;
            _score += 10;
            _firstIndex = null;
            _waiting = false;
          });
        });
      } else {
        Future.delayed(const Duration(seconds: 1), () {
          setState(() {
            _flipped[first] = false;
            _flipped[index] = false;
            _firstIndex = null;
            _waiting = false;
          });
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final allMatched = _matched.every((m) => m);

    return Scaffold(
      appBar: AppBar(
        title: Text("AI Game Zone - ${widget.unitKey}"),
        backgroundColor: Colors.indigo,
      ),
      body: allMatched
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    "🎉 You Won! 🎉",
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  Text("Final Score: $_score",
                      style: const TextStyle(fontSize: 20)),
                  const SizedBox(height: 20),
                  ElevatedButton.icon(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.home),
                    label: const Text("Back to Units"),
                  ),
                ],
              ),
            )
          : GridView.builder(
              padding: const EdgeInsets.all(20),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 3,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
              ),
              itemCount: _cardImages.length,
              itemBuilder: (context, index) {
                return GestureDetector(
                  onTap: () => _onCardTap(index),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    decoration: BoxDecoration(
                      color: _matched[index]
                          ? Colors.greenAccent
                          : Colors.indigo.shade100,
                      borderRadius: BorderRadius.circular(12),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.indigo.shade200,
                          blurRadius: 4,
                        ),
                      ],
                    ),
                    child: _flipped[index] || _matched[index]
                        ? Padding(
                            padding: const EdgeInsets.all(8),
                            child: Image.asset(_cardImages[index]),
                          )
                        : const Center(
                            child: Icon(Icons.question_mark,
                                color: Colors.indigo, size: 40),
                          ),
                  ),
                );
              },
            ),
      bottomNavigationBar: Container(
        color: Colors.indigo.shade50,
        padding: const EdgeInsets.all(12),
        child: Text(
          "Score: $_score",
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
