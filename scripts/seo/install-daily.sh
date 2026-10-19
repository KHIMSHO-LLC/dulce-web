#!/bin/zsh
# Installs the daily SEO writer as a launchd job (macOS): every day at 08:00
# local time, if the Mac is awake (launchd runs it on wake if it was asleep).
# Usage: scripts/seo/install-daily.sh /path/to/dedicated/clone/of/dulce-web
set -euo pipefail
CLONE="${1:?path to a dedicated clone of dulce-web}"
LABEL="com.dulceglucosa.seo-daily"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
cat > "$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array><string>/bin/zsh</string><string>$CLONE/scripts/seo/run-daily.sh</string></array>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>8</integer><key>Minute</key><integer>0</integer></dict>
  <key>StandardOutPath</key><string>$CLONE/seo/runs/launchd.out</string>
  <key>StandardErrorPath</key><string>$CLONE/seo/runs/launchd.err</string>
</dict>
</plist>
PL
mkdir -p "$CLONE/seo/runs"
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "installed $PLIST (daily 08:00). Run now: launchctl kickstart gui/$(id -u)/$LABEL"
echo "Remove: launchctl bootout gui/$(id -u)/$LABEL && rm $PLIST"
