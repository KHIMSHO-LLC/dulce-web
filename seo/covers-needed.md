# Blog covers needed

Rules: content/README.md → "Images". One line per article: id | scene | screenshot on the screen.
Generate with the real screenshot as a reference image (never AI-drawn UI), save to
public/guides/covers/<id>.webp, set `image` in content/articles.ts, delete the line.

Existing articles still on shared images (home-screen.jpg is used 7 times):
- every article in content/articles.ts whose `image` is not under /guides/covers/
