# Audio Directory

Optional sound effects for ROAB. To enable audio:

1. Add MP3 files to this directory
2. Uncomment the audio playback code in script.js (see the playSound() function)

## Audio Files Needed

### popup.mp3
Old Windows popup/notification sound
Used when: Auth popup appears

### error.mp3
Error/access denied sound
Used when: Wrong password entered

### access-granted.mp3
Positive confirmation sound
Used when: Correct password accepted

### glitch.mp3
Digital glitch/corruption sound
Used when: Phase transition begins

### flicker.mp3
Screen flicker sound (subtle)
Used when: Screen blacks out during transition

## Notes

- Keep files under 500KB for fast loading
- MP3 format recommended for browser compatibility
- All audio is optional - website works perfectly without it
- Consider copyright/licensing when adding audio
