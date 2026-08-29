/* ===================================================================
   ROAB — Research of Abnormal Behaviour
   Complete ARG Website JavaScript
   
   Handles:
   - Phase 1 interactivity
   - Authentication popup system
   - Phase transition with visual glitches
   - Phase 2 dynamic content loading
   - Hidden secrets and easter eggs
   =================================================================== */

// ===================================================================
// CONFIGURATION
// ===================================================================

const CONFIG = {
    // Correct password (case-insensitive, spaces trimmed)
    CORRECT_PASSWORD: 'Parasite breaches',
    
    // Password for trials section
    TRIALS_PASSWORD: 'unlock trials',
    
    // Whether to log debug info to console
    DEBUG: false,
    
    // Glitch effect timing (milliseconds)
    GLITCH_DURATION: 100,
    FLICKER_DURATION: 200,
    
    // Phase transition timing
    TRANSITION_DELAY: 500,
};

// ===================================================================
// STATE MANAGEMENT
// ===================================================================

const STATE = {
    currentPhase: 1,
    isTransitioning: false,
    phase2Data: {},
    trialsUnlocked: false,
};

// ===================================================================
// PHASE 1 INITIALIZATION
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    initPhase1();
});

function initPhase1() {
    if (CONFIG.DEBUG) console.log('Initializing Phase 1...');
    
    // Set up the anomaly trigger
    const anomalyTrigger = document.getElementById('anomaly-trigger');
    if (anomalyTrigger) {
        anomalyTrigger.addEventListener('click', showAuthPopup);
    }
    
    // Set up auth popup controls
    const authSubmit = document.getElementById('auth-submit');
    const authClose = document.getElementById('auth-close');
    const authPassword = document.getElementById('auth-password');
    
    if (authSubmit) {
        authSubmit.addEventListener('click', handleAuthSubmit);
    }
    
    if (authClose) {
        authClose.addEventListener('click', closeAuthPopup);
    }
    
    if (authPassword) {
        authPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleAuthSubmit();
            }
        });
    }
}

// ===================================================================
// AUTHENTICATION SYSTEM
// ===================================================================

function showAuthPopup() {
    if (CONFIG.DEBUG) console.log('Showing auth popup...');
    
    const authPopup = document.getElementById('auth-popup');
    const authPassword = document.getElementById('auth-password');
    const authError = document.getElementById('auth-error');
    
    // Reset the popup
    authPassword.value = '';
    authError.classList.add('hidden');
    
    // Show popup
    authPopup.classList.remove('hidden');
    authPassword.focus();
    
    // Play popup sound if available
    playSound('popup');
}

function closeAuthPopup() {
    const authPopup = document.getElementById('auth-popup');
    authPopup.classList.add('hidden');
}

function handleAuthSubmit() {
    if (STATE.isTransitioning) return;
    
    const authPassword = document.getElementById('auth-password');
    const userPassword = authPassword.value.trim().toLowerCase();
    const correctPassword = CONFIG.CORRECT_PASSWORD.toLowerCase();
    
    if (CONFIG.DEBUG) console.log('Auth attempt:', userPassword);
    
    if (userPassword === correctPassword) {
        // Correct password
        handleCorrectPassword();
    } else {
        // Wrong password
        handleWrongPassword();
    }
}

function handleCorrectPassword() {
    if (CONFIG.DEBUG) console.log('Correct password entered!');
    
    playSound('access-granted');
    
    // Show "Authorization Accepted" message
    const authContent = document.querySelector('.auth-content');
    const originalContent = authContent.innerHTML;
    
    authContent.innerHTML = '<p class="auth-message">AUTHORIZATION ACCEPTED</p>';
    document.querySelector('.auth-titlebar .auth-title').textContent = 'ROAB SYSTEM - ACCESS GRANTED';
    
    // Freeze the window
    setTimeout(() => {
        // Start transition effect
        startPhaseTransition();
    }, 800);
}

function handleWrongPassword() {
    if (CONFIG.DEBUG) console.log('Wrong password!');
    
    playSound('error');
    
    const authError = document.getElementById('auth-error');
    authError.classList.remove('hidden');
    
    // Shake the window
    const authWindow = document.querySelector('.auth-window');
    authWindow.style.animation = 'none';
    setTimeout(() => {
        authWindow.style.animation = 'shake 0.2s';
    }, 10);
    
    // Clear password field
    document.getElementById('auth-password').value = '';
}

// Window shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// ===================================================================
// PHASE TRANSITION
// ===================================================================

function startPhaseTransition() {
    if (STATE.isTransitioning) return;
    STATE.isTransitioning = true;
    
    if (CONFIG.DEBUG) console.log('Starting phase transition...');
    
    const phase1 = document.getElementById('phase1');
    const phase2 = document.getElementById('phase2');
    const authPopup = document.getElementById('auth-popup');
    
    // Step 1: Glitch effect on current page
    setTimeout(() => {
        phase1.classList.add('screen-glitch');
        playSound('glitch');
    }, 200);
    
    // Step 2: Black screen flicker
    setTimeout(() => {
        phase1.style.opacity = '0';
        authPopup.style.opacity = '0';
        document.body.style.backgroundColor = '#000000';
        playSound('flicker');
    }, 800);
    
    // Step 3: Show corrupted text
    setTimeout(() => {
        const corruptedText = document.createElement('div');
        corruptedText.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff0000;
            font-family: 'Courier New', monospace;
            font-size: 1.2rem;
            text-align: center;
            z-index: 2000;
            white-space: pre;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
        `;
        corruptedText.textContent = generateCorruptedText();
        document.body.appendChild(corruptedText);
        
        setTimeout(() => {
            corruptedText.remove();
        }, 500);
    }, 1200);
    
    // Step 4: Load Phase 2
    setTimeout(() => {
        phase1.classList.add('hidden');
        authPopup.classList.add('hidden');
        document.body.classList.add('phase2-active');
        
        phase2.classList.remove('hidden');
        phase2.style.opacity = '0';
        
        // Fade in Phase 2
        setTimeout(() => {
            phase2.style.transition = 'opacity 0.5s ease-in';
            phase2.style.opacity = '1';
        }, 50);
        
        // Load initial Phase 2 content
        loadPhase2Section('overview');
        
        STATE.currentPhase = 2;
        STATE.isTransitioning = false;
        
        if (CONFIG.DEBUG) console.log('Phase 2 loaded successfully!');
    }, 1800);
}

function generateCorruptedText() {
    const corruptions = [
        '[SYSTEM BREACH DETECTED]',
        '01001110 01000101 01010100 01010111 01001111 01010010 01001011',
        '[DATABASE COMPROMISED]',
        '████████████████',
        '[ACCESS LEVEL: UNRESTRICTED]',
    ];
    
    return corruptions.join('\n');
}

// ===================================================================
// PHASE 2 CONTENT SYSTEM
// ===================================================================

function loadPhase2Section(section) {
    if (CONFIG.DEBUG) console.log('Loading Phase 2 section:', section);
    
    const phase2View = document.getElementById('phase2-view');
    
    switch(section) {
        case 'overview':
            loadOverview(phase2View);
            break;
        case 'gap':
            loadGapFile(phase2View);
            break;
        case 'trials':
            loadTrialsFiles(phase2View);
            break;
        case 'incidents':
            loadIncidentsFiles(phase2View);
            break;
        default:
            loadOverview(phase2View);
    }
}

function loadOverview(container) {
    container.innerHTML = `
        <div class="file-section">
            <div class="file-header">
                <p class="file-designation">STATUS: SYSTEM COMPROMISED</p>
                <p class="file-title">DATABASE OVERVIEW</p>
                <p class="file-status">Last Access: [CORRUPTED] | Records Accessible: 5 / 47</p>
            </div>
            <div class="file-content">
                <p>
                    You have accessed the ROAB internal database at authorization level UNRESTRICTED.
                    This should not be possible.
                </p>
                <p>
                    The following files are partially recoverable:
                </p>
                <ul style="margin-left: 2rem; color: #00ff00; text-shadow: 0 0 5px rgba(0, 255, 0, 0.4);">
                    <li>THE GAP — Classified phenomenon documentation</li>
                    <li>TRIAL FILES — Subject containment records [RESTRICTED]</li>
                    <li>INCIDENT REPORTS — Multiple files (SEVERE CORRUPTION)</li>
                </ul>
                <p style="margin-top: 1.5rem;">
                    The database suggests ROAB ceased normal operations approximately <span class="corrupted-text">███ DAYS AGO</span>.
                    All staff status records are marked: <span style="color: #ff0000; font-weight: bold;">UNKNOWN</span>
                </p>
            </div>
        </div>
    `;
}

function loadGapFile(container) {
    container.innerHTML = `
        <div class="file-section">
            <div class="file-header">
                <p class="file-designation">FILE: GAP-001 | CLASSIFICATION: RESTRICTED</p>
                <p class="file-title">THE GAP</p>
                <p class="file-status">STATUS: UNSTABLE | LAST UPDATED: [CORRUPTED]</p>
            </div>
            <div class="file-content">
                <p>
                    <strong>DISCOVERY DATE:</strong> [DATA EXPUNGED]<br>
                    <strong>LOCATION:</strong> [ACCESS LEVEL INSUFFICIENT]<br>
                    <strong>CLASSIFICATION:</strong> OMEGA-LEVEL THREAT
                </p>
                
                <p>
                    The Gap is an anomalous spatial phenomenon exhibiting properties that contradict fundamental principles of conventional physics. Initial observations suggest:
                </p>
                
                <ul style="margin-left: 2rem;">
                    <li>A <span class="redacted">█████████ wound █████</span> in conventional reality</li>
                    <li>Cross-universal transmission properties</li>
                    <li>Unknown dimensional characteristics</li>
                    <li>Spontaneous manifestation of <span class="redacted">██████████████</span></li>
                </ul>
                
                <p>
                    <strong>THEORETICAL FRAMEWORK:</strong>
                    The Gap appears to connect multiple realities or dimensional iterations. Objects, entities, and potentially information can traverse the Gap under unknown conditions. The mechanism remains unexplained.
                </p>
                
                <p>
                    <strong>ROAB INVESTIGATION STATUS:</strong>
                    Primary research focus has been devoted to understanding The Gap. Resources were redirected toward:
                </p>
                
                <ul style="margin-left: 2rem;">
                    <li>Dimensional stability analysis</li>
                    <li>Containment protocol development</li>
                    <li>Cross-universal entity detection</li>
                    <li>Subject procurement and analysis</li>
                </ul>
                
                <p>
                    <strong>CURRENT STATUS:</strong> [DATA EXPUNGED]
                </p>
                
                <p style="color: #ff0000; margin-top: 1.5rem;">
                    ⚠ WARNING: CONTINUED EXPOSURE TO GAP DOCUMENTATION MAY RESULT IN [ACCESS LEVEL INSUFFICIENT]
                </p>
            </div>
        </div>
    `;
}

function loadTrialsFiles(container) {
    if (!STATE.trialsUnlocked) {
        // Show password prompt
        container.innerHTML = `
            <div class="file-section">
                <div class="file-header">
                    <p class="file-designation">FILES: TRIAL-001 through TRIAL-004 | CLASSIFICATION: OMEGA</p>
                    <p class="file-title">TRIAL SUBJECT FILES</p>
                    <p class="file-status">STATUS: ACCESS RESTRICTED - PASSWORD REQUIRED</p>
                </div>
                <div class="file-content">
                    <p style="text-align: center; margin: 2rem 0;">
                        This section contains restricted trial subject information.
                    </p>
                    <p style="text-align: center;">
                        <input type="password" id="trials-password" class="auth-input" placeholder="Enter password" style="width: 70%; max-width: 300px;">
                    </p>
                    <p style="text-align: center;">
                        <button onclick="unlockTrials()" class="auth-button" style="width: 200px; margin-top: 1rem;">[ UNLOCK ]</button>
                    </p>
                    <p id="trials-error" class="auth-error hidden" style="text-align: center; margin-top: 1rem;">
                        ACCESS DENIED - Incorrect password.
                    </p>
                </div>
            </div>
        `;
        document.getElementById('trials-password').focus();
        return;
    }
    
    // Show trial files
    const trials = [
        {
            name: 'Fate — The Lost Vow',
            designation: 'TRIAL-001',
            behavior: 'Docile when treated with respect.',
            containment: 'Minimal physical restraint. Psychological containment effective.',
            status: '[CONTAINED → MISSING]',
            notes: 'Subject expressed desire to help. Status unknown after facility breach.'
        },
        {
            name: 'Fallen Knight',
            designation: 'TRIAL-002',
            behavior: 'Aggressive when challenged. Protective of other subjects.',
            containment: 'Heavy physical restraint necessary. Psychological manipulation ineffective.',
            status: '[CONTAINED → RELEASED]',
            notes: 'Release circumstances unclear. Containment breach occurred during system collapse.'
        },
        {
            name: 'False Shepherd',
            designation: 'TRIAL-003',
            behavior: 'Deceptive. Frequently attempts psychological manipulation of staff.',
            containment: 'Isolation protocols mandatory. No direct contact without protection.',
            status: '[CONTAINED → MISSING]',
            notes: 'Subject attempted multiple containment breaches. Motive unclear.'
        },
        {
            name: 'Morrow',
            designation: 'TRIAL-004',
            behavior: 'Withdrawn. Minimal verbal communication. Occasionally hostile.',
            containment: 'Specialized temporal stabilization equipment required.',
            status: '[CONTAINED → LOCATION UNKNOWN]',
            notes: 'Subject disappeared during facility collapse. Recovery status unknown.'
        }
    ];
    
    let trialsHTML = `
        <div class="file-section">
            <div class="file-header">
                <p class="file-designation">FILES: TRIAL-001 through TRIAL-004 | CLASSIFICATION: OMEGA</p>
                <p class="file-title">TRIAL SUBJECT FILES</p>
                <p class="file-status">STATUS: PARTIAL RECOVERY SUCCESSFUL</p>
            </div>
        </div>
    `;
    
    trials.forEach(trial => {
        trialsHTML += `
            <div class="trial-card" onclick="toggleTrialDetails(this)">
                <p class="trial-name">${trial.name}</p>
                <p class="trial-designation">${trial.designation}</p>
                <div class="trial-details">
                    <div class="trial-field">
                        <p class="trial-field-label">BEHAVIORAL NOTES:</p>
                        <p class="trial-field-value">${trial.behavior}</p>
                    </div>
                    <div class="trial-field">
                        <p class="trial-field-label">CONTAINMENT METHOD:</p>
                        <p class="trial-field-value">${trial.containment}</p>
                    </div>
                    <div class="trial-field">
                        <p class="trial-field-label">CURRENT STATUS:</p>
                        <p class="trial-field-value" style="color: #ff0000;">${trial.status}</p>
                    </div>
                    <div class="trial-field">
                        <p class="trial-field-label">CLASSIFIED NOTES:</p>
                        <p class="trial-field-value">${trial.notes}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = trialsHTML;
}

function unlockTrials() {
    const trialsPassword = document.getElementById('trials-password');
    const userPassword = trialsPassword.value.trim().toLowerCase();
    const correctPassword = CONFIG.TRIALS_PASSWORD.toLowerCase();
    
    if (CONFIG.DEBUG) console.log('Trials password attempt:', userPassword);
    
    if (userPassword === correctPassword) {
        STATE.trialsUnlocked = true;
        loadTrialsFiles(document.getElementById('phase2-view'));
    } else {
        const error = document.getElementById('trials-error');
        error.classList.remove('hidden');
        trialsPassword.value = '';
        trialsPassword.focus();
    }
}

function loadIncidentsFiles(container) {
    const incidents = [
        {
            name: 'INCIDENT_REPORT_███',
            status: 'SEVERE CORRUPTION',
            preview: '[DATA EXPUNGED] — Containment breach occurred in [CORRUPTED] on [DATE UNRECOVERABLE]. Multiple subjects escaped. Response team [REDACTED]. Status of facility unknown.'
        },
        {
            name: 'PARASITE_RESEARCH',
            status: 'PARTIAL RECOVERY',
            preview: 'Project designation [CORRUPTED]. Research into [DATA EXPUNGED] entities discovered in Gap phenomenon. Results suggest [ACCESS LEVEL INSUFFICIENT]. Final tests were scheduled but [CORRUPTED].'
        },
        {
            name: 'GAP_OBSERVATION_LOG',
            status: 'HEAVILY CORRUPTED',
            preview: '[SYSTEM FAILURE] — Observation data from [█████████] station lost. Final recorded transmission: "The Gap is [███████████████]. It\'s not opening. It\'s [CORRUPTED]."'
        },
        {
            name: 'TRIAL_CONTAINMENT_BREACH',
            status: 'CRITICAL - 89% LOST',
            preview: '[REDACTED] — Breach event timeline unrecoverable. All subjects [STATUS UNKNOWN]. Security protocols [SYSTEM FAILURE].'
        },
        {
            name: 'STAFF_STATUS_FINAL',
            status: 'CORRUPTED - DO NOT READ',
            preview: '[WARNING] This file contains [EXPUNGED]. Personnel status: All staff [LOCATION UNKNOWN]. Communication ceased [DATE UNRECOVERABLE]. Probability of survival: [CORRUPTED].'
        }
    ];
    
    let incidentsHTML = `
        <div class="file-section">
            <div class="file-header">
                <p class="file-designation">INCIDENT REPORTS | MULTIPLE FILES</p>
                <p class="file-title">CORRUPTED ARCHIVE</p>
                <p class="file-status">RECOVERY STATUS: SEVERELY COMPROMISED</p>
            </div>
        </div>
    `;
    
    incidents.forEach((incident, index) => {
        incidentsHTML += `
            <div class="file-section" style="border: 2px solid #ff0000; animation: corrupt-flash 0.5s infinite;">
                <div class="file-header">
                    <p class="file-designation">FILE: ${incident.name}</p>
                    <p class="file-title" style="color: #ff0000;">[CORRUPTED]</p>
                    <p class="file-status" style="color: #ff0000;">${incident.status}</p>
                </div>
                <div class="file-content">
                    <p class="corrupted-text">${incident.preview}</p>
                    <p style="margin-top: 1rem; color: #ff0000; animation: blink 0.5s infinite;">
                        ⚠ FILE INTEGRITY: ${Math.floor(Math.random() * 40 + 10)}% | DATA RECOVERY: IMPOSSIBLE
                    </p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = incidentsHTML;
}

function toggleTrialDetails(element) {
    element.classList.toggle('expanded');
}

// ===================================================================
// AUDIO SYSTEM
// ===================================================================

function playSound(soundName) {
    // This function is structured to accept sound names
    // Audio files can be added later in an audio/ directory
    // Currently commented out to prevent errors if audio files don't exist
    
    const audioFiles = {
        'popup': 'audio/popup.mp3',
        'error': 'audio/error.mp3',
        'access-granted': 'audio/access-granted.mp3',
        'glitch': 'audio/glitch.mp3',
        'flicker': 'audio/flicker.mp3',
    };
    
    // Uncomment when audio files are added:
    /*
    if (audioFiles[soundName]) {
        const audio = new Audio(audioFiles[soundName]);
        audio.play().catch(e => console.log('Audio playback failed:', e));
    }
    */
    
    if (CONFIG.DEBUG) console.log('Sound triggered:', soundName);
}

// ===================================================================
// EASTER EGGS & HIDDEN FEATURES
// ===================================================================

// Konami Code: UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A
const konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1);
    
    if (konamiCode.join(',').includes(konamiSequence.join(','))) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    if (STATE.currentPhase === 1) {
        console.log('%c🔴 EASTER EGG ACTIVATED 🔴', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cROAB Internal Note: "The Trials are not what you think they are."', 'color: #00ff00; font-size: 14px; font-family: monospace;');
    } else {
        const phase2View = document.getElementById('phase2-view');
        const secretMessage = document.createElement('div');
        secretMessage.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5000;
            flex-direction: column;
        `;
        secretMessage.innerHTML = `
            <p style="color: #00ff00; font-family: monospace; font-size: 1.2rem; text-align: center; text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);">
                01001001 01010100 01010011 00100000 01010000 01001001 01010100 01010101<br><br>
                THE TRIALS DID NOT WANT TO HURT ANYONE<br><br>
            </p>
            <button onclick="this.parentElement.remove()" style="margin-top: 2rem; padding: 10px 20px; background: #ff0000; color: white; border: none; cursor: pointer; font-family: monospace;">
                CLOSE
            </button>
        `;
        document.body.appendChild(secretMessage);
    }
}

// Hidden click areas in Phase 2
document.addEventListener('click', function(e) {
    if (STATE.currentPhase === 2 && e.target.classList.contains('redacted')) {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = 'var(--phase2-text)';
    }
});

// ===================================================================
// DEBUG UTILITIES
// ===================================================================

if (CONFIG.DEBUG) {
    window.DEBUG_ROAB = {
        transitionToPhase2: startPhaseTransition,
        showAuthPopup: showAuthPopup,
        loadSection: loadPhase2Section,
        getState: () => STATE,
        setDebug: (val) => CONFIG.DEBUG = val,
    };
    console.log('🔴 ROAB Debug Mode Active | Use window.DEBUG_ROAB to access utilities');
}

// ===================================================================
// RESPONSIVE ADJUSTMENTS
// ===================================================================

window.addEventListener('resize', function() {
    // Reposition auth/error popups if needed
    const popup = document.querySelector('.auth-popup:not(.hidden)') || document.querySelector('.error-popup:not(.hidden)');
    if (popup) {
        // Popups are already centered with flexbox, so no adjustment needed
    }
});

// ===================================================================
// ACCESSIBILITY
// ===================================================================

// Ensure proper tab order for auth popup
document.addEventListener('keydown', function(e) {
    const authPopup = document.getElementById('auth-popup');
    if (!authPopup.classList.contains('hidden') && e.key === 'Escape') {
        closeAuthPopup();
    }
});
