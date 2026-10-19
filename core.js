/* Small, dependency-free musical model shared by the interface and checks. */
(function (root) {
  'use strict';
  const names = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  const mod = n => ((n % 12) + 12) % 12;
  const notes = chord => [mod(chord.root), mod(chord.root + (chord.major ? 4 : 3)), mod(chord.root + 7)];
  const chordName = chord => names[mod(chord.root)] + (chord.major ? ' major' : ' minor');
  function transform(chord, operation) {
    if (!['P', 'L', 'R'].includes(operation)) throw new Error('Unknown chord transformation');
    const shift = operation === 'P' ? 0 : operation === 'L' ? (chord.major ? 4 : -4) : (chord.major ? -3 : 3);
    return {root: mod(chord.root + shift), major: !chord.major};
  }
  function voiceLeading(before, after) {
    const remaining = after.filter(note => !before.includes(note));
    return before.map(note => after.includes(note) ? note : remaining.shift());
  }
  const api = {names, mod, notes, chordName, transform, voiceLeading};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CathOSCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
