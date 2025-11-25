import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';

class SavedStoriesPage extends StatelessWidget {
  const SavedStoriesPage({super.key});

  @override
  Widget build(BuildContext context) {
    var box = Hive.box('stories');

    return Scaffold(
      appBar: AppBar(
        title: const Text("Saved Stories"),
        backgroundColor: Colors.indigo,
      ),

      body: ValueListenableBuilder(
        valueListenable: box.listenable(),
        builder: (context, stories, _) {
          if (stories.isEmpty) {
            return const Center(
              child: Text(
                "No stories saved yet!",
                style: TextStyle(fontSize: 18),
              ),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: stories.length,
            itemBuilder: (context, index) {
              final story = stories.getAt(index);

              return Card(
                elevation: 4,
                margin: const EdgeInsets.only(bottom: 16),
                child: ListTile(
                  title: Text(
                    story['title'],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  subtitle: Text(
                    story['story'].length > 60
                        ? story['story'].substring(0, 60) + "..."
                        : story['story'],
                  ),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red),
                    onPressed: () {
                      box.deleteAt(index);
                    },
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => StoryDetailPage(story: story),
                      ),
                    );
                  },
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class StoryDetailPage extends StatelessWidget {
  final Map story;
  const StoryDetailPage({super.key, required this.story});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(story['title']),
        backgroundColor: Colors.indigo,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Text(
          story['story'],
          style: const TextStyle(fontSize: 18, height: 1.5),
        ),
      ),
    );
  }
}
