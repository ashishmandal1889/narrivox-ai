import { useMemo, useState } from 'react';

const samplePoem = `The moon keeps silver in its hands
I walk where quiet rivers run`;

const rhymeBank = {
  light: ['night', 'bright', 'sight', 'flight', 'white', 'write'],
  night: ['light', 'bright', 'sight', 'flight', 'white', 'write'],
  day: ['way', 'say', 'stay', 'clay', 'gray', 'away'],
  heart: ['start', 'part', 'art', 'smart', 'chart', 'apart'],
  sea: ['free', 'tree', 'be', 'see', 'me', 'key'],
  rain: ['again', 'plain', 'chain', 'train', 'remain', 'windowpane'],
  fire: ['desire', 'choir', 'wire', 'higher', 'spire', 'tire'],
  stone: ['alone', 'known', 'bone', 'homegrown', 'throne', 'tone'],
  sky: ['why', 'fly', 'high', 'cry', 'by', 'reply'],
  run: ['sun', 'one', 'done', 'begun', 'spun', 'undone'],
  hands: ['lands', 'sands', 'stands', 'commands', 'strands', 'understands'],
};

const endings = [
  { suffix: 'ight', words: ['night', 'light', 'bright', 'sight', 'flight'] },
  { suffix: 'ain', words: ['rain', 'again', 'plain', 'chain', 'remain'] },
  { suffix: 'ay', words: ['day', 'way', 'say', 'stay', 'away'] },
  { suffix: 'ee', words: ['free', 'sea', 'tree', 'see', 'be'] },
  { suffix: 'one', words: ['stone', 'alone', 'known', 'throne', 'tone'] },
  { suffix: 'ire', words: ['fire', 'desire', 'higher', 'choir', 'wire'] },
];

const devices = [
  {
    name: 'Metaphor',
    use: 'Turn an emotion into a concrete object.',
    example: 'My doubt became a locked blue door.',
  },
  {
    name: 'Imagery',
    use: 'Add sensory detail: color, sound, texture, temperature.',
    example: 'Cold rain stitched the windows shut.',
  },
  {
    name: 'Alliteration',
    use: 'Repeat consonant sounds to make the line musical.',
    example: 'Soft silver silence settled slowly.',
  },
  {
    name: 'Enjambment',
    use: 'Let a sentence flow over the line break for momentum.',
    example: 'I carried the dawn / until it carried me.',
  },
  {
    name: 'Personification',
    use: 'Give an object a human action or desire.',
    example: 'The road remembered every footstep.',
  },
  {
    name: 'Volta',
    use: 'Shift the poem from observation to realization.',
    example: 'But then the dark began to answer.',
  },
  {
    name: 'Simile',
    use: 'Compare two unlike things with like or as.',
    example: 'The evening opened like a letter.',
  },
  {
    name: 'Assonance',
    use: 'Repeat vowel sounds for internal music.',
    example: 'Low stones hold old cold echoes.',
  },
  {
    name: 'Caesura',
    use: 'Place a pause inside the line for drama or breath.',
    example: 'I reached for morning - and found smoke.',
  },
  {
    name: 'Anaphora',
    use: 'Repeat the same opening phrase across lines.',
    example: 'I wanted rain. I wanted roads. I wanted return.',
  },
  {
    name: 'Symbolism',
    use: 'Let an object carry a larger meaning.',
    example: 'The cracked cup waited by the door.',
  },
  {
    name: 'Meter',
    use: 'Shape rhythm by balancing stressed and unstressed beats.',
    example: 'The wind arrived and walked beside the sea.',
  },
];

const nextLineTemplates = [
  'And {image} learns the shape of {rhyme}',
  'Where {image} keeps returning into {rhyme}',
  'I follow {image} toward a softer {rhyme}',
  'Until the silence opens into {rhyme}',
  'As if the world were made to answer {rhyme}',
];

const images = ['the rain', 'a small lamp', 'the wind', 'my shadow', 'the river', 'the old street'];

const rhymeSchemeOptions = {
  4: ['Free', 'AABB', 'ABAB', 'ABCB', 'ABBA', 'AAAA'],
  6: ['Free', 'AABBCC', 'ABABCC', 'ABCABC', 'AABCCB', 'ABCCBA'],
};

const poetryForms = {
  'Free Verse': {
    scheme: 'Free',
    lines: 4,
    guidance: 'No required rhyme or meter. Focus on image, voice, and emotional movement.',
  },
  Ode: {
    scheme: 'ABAB',
    lines: 4,
    guidance: 'Address a subject with praise, wonder, and elevated imagery.',
  },
  'Proper Rhyming': {
    scheme: 'AABB',
    lines: 4,
    guidance: 'Keep line endings musical and repeat the rhyme pattern each verse.',
  },
  Sonnet: {
    scheme: 'ABAB',
    lines: 4,
    guidance: 'Develop an argument or emotional turn, then resolve it in the final couplet.',
  },
  Haiku: {
    scheme: 'Free',
    lines: 4,
    guidance: 'Use 3 compact lines, concrete imagery, and a small turn of perception.',
  },
  Ballad: {
    scheme: 'ABCB',
    lines: 4,
    guidance: 'Tell a story with simple language, movement, and memorable refrains.',
  },
  Elegy: {
    scheme: 'Free',
    lines: 4,
    guidance: 'Reflect on loss, memory, and tenderness with restrained emotional movement.',
  },
  Limerick: {
    scheme: 'AABBCC',
    lines: 6,
    guidance: 'Use a playful five-line shape with a strong bounce and comic turn.',
  },
  Villanelle: {
    scheme: 'ABCABC',
    lines: 6,
    guidance: 'Use repeating refrains and a tight rhyme pattern for a circular, obsessive feeling.',
  },
};

function getLines(text) {
  return text.split('\n');
}

function cleanWord(word) {
  return word.toLowerCase().replace(/[^a-z']/g, '');
}

function getLastWord(line) {
  const words = line.trim().split(/\s+/).filter(Boolean);
  return cleanWord(words.at(-1) || '');
}

function getPreviousLine(text) {
  const lines = getLines(text).map((line) => line.trim()).filter(Boolean);
  if (lines.length === 0) return '';
  return lines.at(-1);
}

function getRhymes(word) {
  const normalized = cleanWord(word);
  if (!normalized) return [];
  if (rhymeBank[normalized]) return rhymeBank[normalized];

  const endingMatch = endings.find(({ suffix }) => normalized.endsWith(suffix));
  if (endingMatch) {
    return endingMatch.words.filter((item) => item !== normalized);
  }

  const tail = normalized.slice(-2);
  return Object.values(rhymeBank)
    .flat()
    .filter((item) => item.endsWith(tail) && item !== normalized)
    .slice(0, 6);
}

function estimateSyllables(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.reduce((count, word) => {
    const matches = cleanWord(word).match(/[aeiouy]+/g);
    return count + Math.max(1, matches?.length || 0);
  }, 0);
}

function makeNextLine(lastWord, rhymes, poem) {
  const seed = poem.length + lastWord.length;
  const rhyme = rhymes[seed % Math.max(1, rhymes.length)] || lastWord || 'light';
  const image = images[seed % images.length];
  const template = nextLineTemplates[seed % nextLineTemplates.length];
  return template.replace('{image}', image).replace('{rhyme}', rhyme);
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function countMatches(text, patterns) {
  return patterns.reduce((sum, pattern) => sum + (text.match(pattern) || []).length, 0);
}

function getSchemeLetters(scheme) {
  return scheme.toUpperCase().replace(/[^A-Z]/g, '').split('');
}

function getRhymeSignature(word) {
  const clean = cleanWord(word);
  if (!clean) return '';
  const vowelIndex = clean.search(/[aeiouy][^aeiouy]*$/);
  return vowelIndex >= 0 ? clean.slice(vowelIndex) : clean.slice(-2);
}

function getRhymeTarget(lines, rhymeScheme, linesPerVerse) {
  const schemeLetters = getSchemeLetters(rhymeScheme);
  const targetIndex = lines.length;
  const positionInVerse = targetIndex % linesPerVerse;
  const verseStart = targetIndex - positionInVerse;
  const targetLetter = schemeLetters[positionInVerse % Math.max(1, schemeLetters.length)] || 'Free';

  if (rhymeScheme.toLowerCase() === 'free' || targetLetter === 'Free') {
    const sourceLine = lines.at(-1) || '';
    return {
      targetLetter: 'Free',
      sourceLine,
      sourceWord: getLastWord(sourceLine),
      positionInVerse,
    };
  }

  const matchingPosition = schemeLetters
    .slice(0, positionInVerse)
    .findIndex((letter) => letter === targetLetter);
  const sourceLine =
    matchingPosition >= 0
      ? lines[verseStart + matchingPosition]
      : lines.at(-1) || '';

  return {
    targetLetter,
    sourceLine,
    sourceWord: getLastWord(sourceLine),
    positionInVerse,
  };
}

function scorePoem({ poem, analysis, rhymeScheme, poetryForm, linesPerVerse }) {
  const text = poem.trim();
  const lines = getLines(poem).map((line) => line.trim()).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const uniqueWords = new Set(words.map(cleanWord).filter(Boolean));
  const syllables = analysis.syllables;

  if (lines.length === 0) {
    return {
      flow: 0,
      imagery: 0,
      creativity: 0,
      structure: 0,
      overall: 0,
      note: 'Start writing to receive a poem score.',
    };
  }

  const avg = analysis.averageSyllables || 1;
  const variation =
    syllables.reduce((sum, count) => sum + Math.abs(count - avg), 0) / Math.max(1, syllables.length);
  const flow = clampScore(88 - variation * 8 + Math.min(lines.length, 8) * 2);

  const imageryTerms = countMatches(text.toLowerCase(), [
    /\bmoon|sun|rain|river|sea|wind|stone|fire|sky|shadow|light|dark|flower|dust|snow|window|road\b/g,
    /\bsilver|gold|blue|red|white|black|green|cold|warm|soft|bitter|bright\b/g,
    /\bwhisper|echo|sing|burn|glow|tremble|stitch|carry|remember\b/g,
  ]);
  const imagery = clampScore(44 + imageryTerms * 9 + Math.min(lines.length, 8) * 2);

  const deviceTerms = countMatches(text.toLowerCase(), [
    /\blike\b|\bas\b/g,
    /\bbut\b|\byet\b|\buntil\b/g,
    /\bi\s+\w+.*\bi\s+\w+/g,
  ]);
  const vocabulary = uniqueWords.size / Math.max(1, words.length);
  const creativity = clampScore(42 + vocabulary * 38 + deviceTerms * 7 + Math.min(words.length, 80) / 3);

  const schemeLetters = getSchemeLetters(rhymeScheme);
  const endingsByLetter = {};
  let matchingEndings = 0;
  if (poetryForm === 'Free Verse' || rhymeScheme.toLowerCase() === 'free') {
    matchingEndings = lines.length;
  } else {
    lines.forEach((line, index) => {
      const letter = schemeLetters[index % Math.max(1, schemeLetters.length)];
      const signature = getRhymeSignature(getLastWord(line));
      if (!letter || !signature) return;
      if (!endingsByLetter[letter]) {
        endingsByLetter[letter] = signature;
        matchingEndings += 1;
      } else if (endingsByLetter[letter] === signature) {
        matchingEndings += 1;
      }
    });
  }

  const verseFit = linesPerVerse > 0 ? lines.filter((_, index) => (index + 1) % linesPerVerse === 0).length : 0;
  const structure = clampScore(
    35 +
      (matchingEndings / Math.max(1, lines.length)) * 42 +
      Math.min(verseFit, 4) * 5 +
      (poetryForms[poetryForm] ? 8 : 0)
  );

  const overall = clampScore(flow * 0.28 + imagery * 0.24 + creativity * 0.24 + structure * 0.24);
  const note =
    overall >= 82
      ? 'Strong poem. The sound, structure, and imagery are working together.'
      : overall >= 62
        ? 'Promising draft. Strengthen the weakest score and the poem will open up.'
        : 'Good start. Add sharper images, steadier line music, and a clearer pattern.';

  return { flow, imagery, creativity, structure, overall, note };
}

function App() {
  const [poem, setPoem] = useState(samplePoem);
  const [suggestedLine, setSuggestedLine] = useState('');
  const [activeDevice, setActiveDevice] = useState(devices[0].name);
  const [poetryForm, setPoetryForm] = useState('Proper Rhyming');
  const [rhymeScheme, setRhymeScheme] = useState(poetryForms['Proper Rhyming'].scheme);
  const [linesPerVerse, setLinesPerVerse] = useState(poetryForms['Proper Rhyming'].lines);

  const analysis = useMemo(() => {
    const lines = getLines(poem);
    const filledLines = lines.map((line) => line.trim()).filter(Boolean);
    const previousLine = getPreviousLine(poem);
    const lastWord = getLastWord(previousLine);
    const syllables = filledLines.map((line) => estimateSyllables(line));
    const rhymeTarget = getRhymeTarget(filledLines, rhymeScheme, linesPerVerse);
    const rhymes = getRhymes(rhymeTarget.sourceWord || lastWord);

    return {
      lines: filledLines.length,
      lastLine: previousLine,
      lastWord,
      rhymeTarget,
      rhymes,
      syllables,
      averageSyllables:
        syllables.length > 0
          ? Math.round(syllables.reduce((sum, value) => sum + value, 0) / syllables.length)
          : 0,
    };
  }, [linesPerVerse, poem, rhymeScheme]);

  function handleSuggestNextLine() {
    setSuggestedLine(makeNextLine(analysis.lastWord, analysis.rhymes, poem));
  }

  function handleAddLine(line) {
    if (!line.trim()) return;
    setPoem((current) => `${current.replace(/\s+$/g, '')}\n${line}`);
    setSuggestedLine('');
  }

  function handleAddRhymeWord(word) {
    if (!word.trim()) return;
    setPoem((current) => {
      const needsSpace = current.trim().length > 0 && !/\s$/.test(current);
      return `${current}${needsSpace ? ' ' : ''}${word}`;
    });
  }

  const selectedDevice = devices.find((device) => device.name === activeDevice) || devices[0];
  const score = useMemo(
    () => scorePoem({ poem, analysis, rhymeScheme, poetryForm, linesPerVerse }),
    [analysis, linesPerVerse, poem, poetryForm, rhymeScheme]
  );

  function handleFormChange(form) {
    setPoetryForm(form);
    setRhymeScheme(poetryForms[form].scheme);
    setLinesPerVerse(poetryForms[form].lines);
  }

  function handleLinesPerVerseChange(count) {
    setLinesPerVerse(count);
    if (!rhymeSchemeOptions[count].includes(rhymeScheme)) {
      setRhymeScheme(rhymeSchemeOptions[count][1]);
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">ThinkFlow Poet</p>
          <h1>Poem writer and poet assistant.</h1>
          <p>
            Choose a form, set a rhyme scheme, write your lines, and get help with rhymes, poetic devices, flow, imagery, and creativity.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={() => setPoem('')}>
          New poem
        </button>
      </header>

      <section className="poet-layout" aria-label="Poetry writing workspace">
        <section className="editor-panel">
          <section className="setup-panel" aria-label="Poem setup">
            <label>
              <span>Poetry form</span>
              <select value={poetryForm} onChange={(event) => handleFormChange(event.target.value)}>
                {Object.keys(poetryForms).map((form) => (
                  <option key={form}>{form}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Rhyme scheme</span>
              <select
                value={rhymeScheme}
                onChange={(event) => setRhymeScheme(event.target.value)}
              >
                {rhymeSchemeOptions[linesPerVerse].map((scheme) => (
                  <option key={scheme}>{scheme}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Lines per verse</span>
              <select
                value={linesPerVerse}
                onChange={(event) => handleLinesPerVerseChange(Number(event.target.value))}
              >
                {[4, 6].map((count) => (
                  <option key={count} value={count}>{count}</option>
                ))}
              </select>
            </label>

            <p>{poetryForms[poetryForm].guidance}</p>
          </section>

          <div className="panel-header">
            <div>
              <h2>Poem</h2>
              <span>
                {analysis.lines} lines | {linesPerVerse} per verse | {rhymeScheme || 'free'} scheme
              </span>
            </div>
            <button type="button" onClick={() => setPoem(samplePoem)}>
              Load sample
            </button>
          </div>

          <textarea
            value={poem}
            onChange={(event) => setPoem(event.target.value)}
            placeholder="Begin your poem here..."
            aria-label="Poem writing area"
            spellCheck="true"
          />
        </section>

        <aside className="assistant-panel" aria-label="Poet assistant">
          <section className="assistant-card score-card">
            <div className="panel-title">
              <h2>Poem Score</h2>
              <span>Overall: <strong>{score.overall}/100</strong></span>
            </div>
            <div
              className="score-ring"
              style={{ '--score-fill': `${score.overall}%` }}
              aria-label={`Overall poem score ${score.overall} out of 100`}
            >
              {score.overall}
            </div>
            <div className="score-list">
              {[
                ['Flow', score.flow],
                ['Imagery', score.imagery],
                ['Creativity', score.creativity],
                ['Structure', score.structure],
              ].map(([label, value]) => (
                <div className="score-row" key={label}>
                  <span>{label}</span>
                  <meter min="0" max="100" value={value}>{value}</meter>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p>{score.note}</p>
          </section>

          <section className="assistant-card">
            <div className="panel-title">
              <h2>Rhyme Finder</h2>
              <span>
                Next line: <strong>{analysis.rhymeTarget.targetLetter}</strong>
              </span>
            </div>

            <p className="rhyme-context">
              Rhyming from: <strong>{analysis.rhymeTarget.sourceWord || 'write a line first'}</strong>
            </p>

            <div className="rhyme-list" aria-label="Suggested rhymes">
              {analysis.rhymes.length > 0 ? (
                analysis.rhymes.map((rhyme) => (
                  <button key={rhyme} type="button" onClick={() => handleAddRhymeWord(rhyme)}>
                    {rhyme}
                  </button>
                ))
              ) : (
                <p>Write a line to see rhyme suggestions.</p>
              )}
            </div>
          </section>

          <section className="assistant-card">
            <div className="panel-title">
              <h2>Next Line</h2>
              <span>Optional creative nudge</span>
            </div>
            <button className="primary-button" type="button" onClick={handleSuggestNextLine}>
              Suggest next line
            </button>
            <div className="suggestion-box">
              <p>{suggestedLine || 'Ask for a line when you feel stuck.'}</p>
              <button
                className="secondary-button"
                type="button"
                onClick={() => handleAddLine(suggestedLine)}
                disabled={!suggestedLine}
              >
                Add to poem
              </button>
            </div>
          </section>

          <section className="assistant-card">
            <div className="panel-title">
              <h2>Poetic Devices</h2>
              <span>Choose a technique to guide the next line</span>
            </div>
            <div className="device-tabs" role="tablist" aria-label="Poetic devices">
              {devices.map((device) => (
                <button
                  key={device.name}
                  type="button"
                  className={activeDevice === device.name ? 'active' : ''}
                  onClick={() => setActiveDevice(device.name)}
                >
                  {device.name}
                </button>
              ))}
            </div>
            <div className="device-note">
              <strong>{selectedDevice.use}</strong>
              <p>{selectedDevice.example}</p>
            </div>
          </section>

          <section className="assistant-card compact">
            <div className="panel-title">
              <h2>Line Music</h2>
              <span>Syllable estimate</span>
            </div>
            <ol className="meter-list">
              {analysis.syllables.length > 0 ? (
                analysis.syllables.slice(-6).map((count, index) => (
                  <li key={`${count}-${index}`}>Line {Math.max(1, analysis.lines - analysis.syllables.slice(-6).length + index + 1)}: {count} syllables</li>
                ))
              ) : (
                <li>No lines yet.</li>
              )}
            </ol>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default App;
