#!/bin/zsh
# SEO writer (Fri/Sun/Tue, see install-daily.sh). Runs Claude Code headless against a dedicated clean clone
# of this repo (never a working checkout): syncs main, then follows
# seo/daily-article.md, which publishes by pushing to main.
# Installed as a launchd job by scripts/seo/install-daily.sh.
set -euo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$PATH"

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
LOG_DIR="$REPO/seo/runs"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/$(date +%Y-%m-%d).log"

{
  echo "== $(date) start"
  cd "$REPO"
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "working tree not clean, refusing to run"; exit 1
  fi
  git checkout -q main
  git fetch -q origin
  git reset -q --hard origin/main
  npm ci --silent --no-audit --no-fund
  # Released app source for fact checks: a dedicated dulce-app clone next to this one.
  git -C ../dulce-app fetch -q origin
  git -C ../dulce-app checkout -q -B main origin/main

  claude -p "$(cat seo/daily-article.md)" \
    --model claude-opus-5-5 \
    --permission-mode acceptEdits \
    --allowedTools "Read,Write,Edit,Glob,Grep,WebFetch,WebSearch,Bash(npm run *),Bash(npm ci*),Bash(git *),Bash(gum *),Bash(node *),Bash(ls *),Bash(cat *),Bash(date*),Bash(mkdir *)" \
    --add-dir "$REPO/../dulce-app"
  echo "== $(date) done"
} >> "$LOG" 2>&1
