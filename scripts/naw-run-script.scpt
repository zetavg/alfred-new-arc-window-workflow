-- The content is copy-pasted into the Alfred Workflow.

on run argv
  set query to item 1 of argv

  tell application "/Applications/Arc.app"
    make new window
    activate
  end tell

  tell application "System Events"
    repeat
      set activeApp to name of application processes whose frontmost is true
      if ((activeApp as string) is equal to "Arc") then exit repeat
    end repeat

    delay 0.1

    tell process "Arc"
      click menu item query of menu 1 of menu bar item "Spaces" of menu bar 1
    end tell
  end tell
end run
