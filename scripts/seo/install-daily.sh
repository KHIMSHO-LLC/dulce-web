#!/bin/zsh
# Installs the SEO writer as a launchd job (macOS): Friday 10:00, Sunday 03:00
# and Tuesday 23:00 local time (launchd runs a missed slot on wake if the Mac
# was asleep).
# Usage: scripts/seo/install-daily.sh /path/to/dedicated/clone/of/dulce-web
# The clone and a clone of dulce-app next to it must live outside ~/Desktop,
# ~/Documents and ~/Downloads: macOS privacy blocks launchd jobs from reading there.
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
  <array>
    <dict><key>Weekday</key><integer>5</integer><key>Hour</key><integer>10</integer><key>Minute</key><integer>0</integer></dict>
    <dict><key>Weekday</key><integer>0</integer><key>Hour</key><integer>3</integer><key>Minute</key><integer>0</integer></dict>
    <dict><key>Weekday</key><integer>2</integer><key>Hour</key><integer>23</integer><key>Minute</key><integer>0</integer></dict>
  </array>
  <key>StandardOutPath</key><string>$CLONE/seo/runs/launchd.out</string>
  <key>StandardErrorPath</key><string>$CLONE/seo/runs/launchd.err</string>
</dict>
</plist>
PL
mkdir -p "$CLONE/seo/runs"
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "installed $PLIST (Fri 10:00, Sun 03:00, Tue 23:00). Run now: launchctl kickstart gui/$(id -u)/$LABEL"
echo "Remove: launchctl bootout gui/$(id -u)/$LABEL && rm $PLIST"
