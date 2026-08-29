# ROAB — Research of Abnormal Behaviour

An immersive ARG/horror investigation website featuring a two-phase progression system. Players start on a seemingly legitimate research facility website and unlock a corrupted internal database through a hidden authentication puzzle.

## 🎮 Project Overview

**ROAB** is a fully functional alternate reality game (ARG) website built with vanilla HTML, CSS, and JavaScript. It requires no backend, database, or external dependencies, and is suitable for hosting on GitHub Pages.

### Two-Phase System

**Phase 1: NORMAL ROAB WEBSITE**
- Professional research facility aesthetic
- Slightly outdated design (aged paper background, serif fonts, muted colors)
- Contains hidden trigger word "Anomaly"
- Appears completely legitimate on first visit

**Phase 2: BREACHED DATABASE**
- Corrupted internal system aesthetic (dark, glitchy, red/green text)
- Accessible only after entering correct password
- Contains classified files, trial records, and corrupted data
- Visual effects include glitches, scanlines, and text distortions
- Reveals the darker history of ROAB organization

## 🔑 How It Works

1. **Explore Phase 1** - Looks like a normal organization website about researching abnormal behavior
2. **Find "Anomaly"** - Hidden in the About section, styled as regular text but clickable
3. **Trigger Auth Popup** - Old Windows 95-style password prompt appears
4. **Enter Password** - Correct password: `Parasite breaches` (case-insensitive)
5. **Experience Transition** - Screen glitches, flickers, and transitions to Phase 2
6. **Explore Phase 2** - Access corrupted database with files about:
   - **The Gap** — Anomalous spatial phenomenon
   - **Trial Subjects** — Contained entities (Fate, Fallen Knight, False Shepherd, Morrow)
   - **Professor Newton** — Founder with corrupted files
   - **Emily Chen** — Researcher who released the subjects
   - **Incident Reports** — Severely corrupted files

## 📁 Project Structure

```
roab-arg-website/
├── index.html          # Main website (Phase 1 + Phase 2 container)
├── style.css           # Complete styling for both phases
├── script.js           # All interactivity, transitions, content
├── README.md           # This file
├── images/             # Image placeholders (replace with your own)
│   ├── staff/
│   ├── trials/
│   └── documents/
└── audio/              # Optional audio effects (structure ready)
    ├── popup.mp3
    ├── error.mp3
    ├── access-granted.mp3
    ├── glitch.mp3
    └── flicker.mp3
```

## 🎨 Customization Guide

### Replacing Image Placeholders

All image placeholders in the HTML are currently simple colored divs with initials or text. To replace them:

1. **Staff Images (Phase 1)**
   - Located in `index.html` within the Staff Directory section
   - Replace the `.placeholder-image` divs with actual `<img>` tags
   - Recommended size: 200x150px
   - Example:
   ```html
   <div class="staff-image">
       <img src="images/staff/professor-newton.jpg" alt="Professor Newton">
   </div>
   ```

2. **Trial Images (Phase 2)**
   - Added within Phase 2 trial card section
   - Use the `.phase2-image` class for consistent styling
   - Recommended size: 400x200px
   - Add within trial details:
   ```html
   <div class="phase2-image">
       <img src="images/trials/fate.jpg" alt="Fate Trial Subject">
   </div>
   ```

3. **Document/Incident Images**
   - Phase 2 corrupted files can include images
   - Use same `.phase2-image` class
   - Recommended: scan lines effect works with slightly blurry/distorted images

### Adding New Trial Subjects

To add new trial subjects in Phase 2:

1. Open `script.js` and find the `loadTrialsFiles()` function
2. Add a new object to the `trials` array:
```javascript
{
    name: 'Your Trial Name',
    designation: 'TRIAL-005',
    abilities: 'Description of abilities',
    behavior: 'Behavioral patterns',
    containment: 'How it was contained',
    relationship: 'Relationship to staff',
    status: '[CONTAINED → STATUS]',
    notes: 'Additional notes'
}
```
3. The card will automatically be generated with click-to-expand functionality

### Adding New Phase 2 Sections

To add new sections to the Phase 2 navigation:

1. In `index.html`, add a new nav link:
```html
<li><a href="#" onclick="loadPhase2Section('mysection')">MY SECTION</a></li>
```

2. In `script.js`, add a new case in `loadPhase2Section()`:
```javascript
case 'mysection':
    loadMySection(phase2View);
    break;
```

3. Create a new function:
```javascript
function loadMySection(container) {
    container.innerHTML = `<div class="file-section">...</div>`;
}
```

### Changing Text & Content

- **Phase 1 content**: Edit text directly in `index.html`
- **Phase 2 content**: Edit content in `script.js` within each `load*File()` function
- **Navigation labels**: Change both in HTML `<a>` tags and in JavaScript function calls
- **Password**: Change `CONFIG.CORRECT_PASSWORD` in `script.js`

### Visual Customization

In `style.css`, you can adjust:

- **Phase 1 Colors** (`:root` CSS variables):
  - `--phase1-bg`: Background (default: aged paper `#f5f1ed`)
  - `--phase1-accent`: Accent color (default: muted red `#8b3a3a`)
  - `--phase1-text`: Text color (default: dark gray `#2a2a2a`)

- **Phase 2 Colors** (`:root` CSS variables):
  - `--phase2-bg`: Background (default: black `#0a0a0a`)
  - `--phase2-text`: Terminal green text (default: `#00ff00`)
  - `--phase2-accent`: Alert red (default: `#ff0000`)
  - `--phase2-purple`: Secondary color (default: `#4a0080`)

- **Glitch Effects**: Adjust animation timing in `@keyframes glitch-animation-1` and `glitch-animation-2`
- **Scanlines**: Modify the `background: repeating-linear-gradient` in `.phase2-scanlines`

### Adding Audio Effects

The audio system is structured but disabled by default. To enable:

1. Create an `audio/` folder in your repository
2. Add sound files:
   - `popup.mp3` — Windows popup sound
   - `error.mp3` — Error/denial sound
   - `access-granted.mp3` — Success sound
   - `glitch.mp3` — Glitch effect
   - `flicker.mp3` — Screen flicker

3. In `script.js`, find the `playSound()` function and uncomment the audio block:
```javascript
if (audioFiles[soundName]) {
    const audio = new Audio(audioFiles[soundName]);
    audio.play().catch(e => console.log('Audio playback failed:', e));
}
```

### Debug Mode

To enable debug mode for development:

1. In `script.js`, change:
   ```javascript
   DEBUG: false,
   ```
   to:
   ```javascript
   DEBUG: true,
   ```

2. This will:
   - Log info to browser console
   - Show `window.DEBUG_ROAB` object with utilities:
     - `DEBUG_ROAB.transitionToPhase2()` — Skip to Phase 2
     - `DEBUG_ROAB.showAuthPopup()` — Show auth popup
     - `DEBUG_ROAB.loadSection('section')` — Load specific Phase 2 section
     - `DEBUG_ROAB.getState()` — View current state

## 🔐 Security Note

This is a **client-side only** website. The password is **not secure** and can be viewed in browser DevTools. This is intentional for an ARG experience. If you need actual security, you would need a backend server.

## 🎯 Key Features

- ✅ **No Backend Required** — Runs entirely in the browser
- ✅ **GitHub Pages Compatible** — Deploy instantly from GitHub
- ✅ **Responsive Design** — Works on desktop, tablet, mobile
- ✅ **Authentic ARG Aesthetic** — Looks like real research documents
- ✅ **Smooth Transitions** — Visual glitching between phases
- ✅ **Extensible** — Easy to add new content, sections, and features
- ✅ **Accessible** — Keyboard navigation, proper contrast
- ✅ **Clean Code** — Well-commented for easy modification
- ✅ **Audio-Ready** — Structure in place for sound effects

## 📱 Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Push this repository to GitHub
2. Go to repository settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch, `/root` folder
5. Your site will be live at `https://yourusername.github.io/roab-arg-website`

### Other Hosting

Simply upload all files to any web server. No build process or special setup needed.

## 🎬 Gameplay Walkthrough

**First-Time Player Experience:**

1. Visit site — sees Phase 1 (normal research website)
2. Reads about ROAB organization, staff, research
3. Notices word "Anomaly" in About section
4. Clicks it (looks like normal text)
5. Retro Windows popup appears asking for password
6. Makes guesses or searches for hints...
7. Eventually finds/discovers: `Parasite breaches`
8. Enters password → Screen glitches → Phase 2 loads
9. Discovers darker story through corrupted files
10. Realizes this isn't just about research — it's about what was contained and why

## 🎨 Design Inspiration

- Analog horror (Local58, The Monument Mythos)
- SCP Foundation document style
- Old computer interfaces (Windows 95/98)
- ARG aesthetics (Marble Hornets, Alternate Reality Games)
- Corrupted data/glitch art
- Retro research facility websites

## 📝 Content Overview

### Phase 1 Sections
- About ROAB (mission, brief history)
- Staff Directory (4 fictional researchers)
- Research Areas (4 categories)
- Facilities (5 locations)
- Contact (fictional email/phone)

### Phase 2 Sections
- Overview (system status)
- The Gap (anomalous phenomenon file)
- Trial Files (4 contained entities with details)
- Professor Newton (founder, corrupted file)
- Emily Chen (researcher who released subjects)
- Incident Reports (5 heavily corrupted files)

## 🔮 Story Elements

The website tells a story without explicit exposition:

- **The Gap**: An anomalous space/phenomenon that connects realities
- **The Trials**: Four mysterious entities contained at ROAB
- **Professor Newton**: Founder obsessed with studying The Gap, suffers unknown fate
- **Emily Chen**: Researcher who grew close to the Trials and released them when the facility collapsed
- **The Breach**: ROAB's systems failed. The Trials escaped. Staff status unknown.

Players are left to piece together what happened and decide if Emily was right to release them.

## 🛠️ Technical Details

- **Framework**: None (vanilla HTML/CSS/JavaScript)
- **Dependencies**: None
- **File Size**: ~45KB total (uncompressed)
- **Build Time**: N/A (no build required)
- **Performance**: Instant load, no network delays

## 📞 Support & Troubleshooting

**Auth popup not showing?**
- Check that JavaScript is enabled
- Verify `index.html` contains `id="anomaly-trigger"` element

**Password not working?**
- Password is case-insensitive
- Leading/trailing spaces are trimmed automatically
- Make sure you're typing: `Parasite breaches`

**Phase 2 not loading?**
- Clear browser cache
- Try in an incognito/private window
- Check browser console for JavaScript errors

**Images not showing?**
- Create `images/` folder in root directory
- Add images to `images/staff/`, `images/trials/`, `images/documents/`
- Update `<img>` src paths in HTML

## 📜 License

This project is provided as-is for ARG/horror game development. Feel free to modify and deploy for your own use.

## 🌟 Tips for ARG Creators

1. **Hide the trigger** — "Anomaly" looks like normal text; players might miss it initially
2. **Distribute the password** — Hide "Parasite breaches" in external media (forum posts, social media, fictional documents)
3. **Add ambiguity** — Don't explain everything; let players theorize
4. **Use realistic styling** — The aged, official look makes it feel real
5. **Expand Phase 2** — Add more corrupted files, hidden links, and secrets
6. **Create mysteries** — What happened to Professor Newton? Where did the Trials go? Was Emily right?

## 🎭 What Makes This an ARG

- **Transmedia elements** — Designed to be part of a larger experience
- **Hidden puzzles** — Password, redacted text, hidden clicks
- **Unreliable narrator** — Is ROAB really a research org or something darker?
- **Community participation** — Players can share theories and findings
- **Narrative mystery** — Story emerges from fragmented documents
- **Real-world integration** — Can be tied to external social media, forums, videos, etc.

---

**Created for ARG/horror game developers. Happy creating! 🔴**
