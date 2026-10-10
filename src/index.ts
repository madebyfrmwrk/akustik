/**
 * Synthesized UI sounds, all in C over the same sub-bass thump. A sound fixes the notes and
 * a theme fixes the instrument, so any one theme's sounds belong together.
 */

/**
 * Where two sounds look alike, pick by what happened:
 * - `select` picks an item; `toggle-on` switches a setting.
 * - `remove` takes an item out; `delete` destroys it for good.
 * - `receive` is a message in the open conversation; `notification` asks for attention.
 * - `success` means an action worked; `complete` means a whole task or flow is finished.
 * - `failure` means the user's action didn't work; `error` means the system broke.
 *
 * `ring` and `ring-alt` are for an incoming call, and repeat until stopped.
 */
export type Sound =
  | "tap"
  | "tick"
  | "select"
  | "deselect"
  | "toggle-on"
  | "toggle-off"
  | "swipe-forward"
  | "swipe-back"
  | "open"
  | "close"
  | "grab"
  | "drop"
  | "disabled"
  | "copy"
  | "add"
  | "remove"
  | "delete"
  | "undo"
  | "redo"
  | "send"
  | "receive"
  | "success"
  | "failure"
  | "complete"
  | "warning"
  | "error"
  | "join"
  | "leave"
  | "notification"
  | "ring"
  | "ring-alt";
export type Theme = "glass" | "string" | "wood";

// MIDI note numbers.
const C2 = 36;
const A2 = 45;
const C3 = 48;
const Db3 = 49;
const D3 = 50;
const Eb3 = 51;
const E3 = 52;
const F3 = 53;
const G3 = 55;
const A3 = 57;
const C4 = 60;
const Eb4 = 63;
const E4 = 64;
const G4 = 67;
const A4 = 69;
const B4 = 71;
const C5 = 72;
const D5 = 74;
const E5 = 76;
const G5 = 79;

type Cue = {
  notes: number[];
  /** Seconds between note onsets. */
  step: number;
  /** Seconds each note rings for. */
  length: number;
  gain: number;
  /** How hard the sub-bass hits, 0 to 1. */
  sub: number;
  /** Lowpass over the whole cue, in Hz. */
  cutoff: number;
  echo: boolean;
};

type Ring = Extract<Sound, "ring" | "ring-alt">;

const CUES: Record<Exclude<Sound, Ring>, Cue> = {
  // Short and quiet, as it plays on every press.
  tap: { notes: [C5], step: 0, length: 0.05, gain: 0.15, sub: 0.1, cutoff: 6000, echo: false },
  // Shorter and quieter still, with no sub, as a slider can fire it many times a second.
  tick: { notes: [G5], step: 0, length: 0.03, gain: 0.1, sub: 0, cutoff: 6000, echo: false },
  // One light note for picking an item, and a much lower, darker one for letting it go.
  select: { notes: [E5], step: 0, length: 0.08, gain: 0.15, sub: 0.1, cutoff: 6000, echo: false },
  deselect: { notes: [C4], step: 0, length: 0.08, gain: 0.17, sub: 0.1, cutoff: 3000, echo: false },
  // A quick fifth up for on, and its mirror an octave lower for off.
  "toggle-on": { notes: [C4, G4], step: 0.04, length: 0.08, gain: 0.15, sub: 0.15, cutoff: 6000, echo: false },
  "toggle-off": { notes: [G3, C3], step: 0.04, length: 0.08, gain: 0.21, sub: 0.15, cutoff: 3000, echo: false },
  // A soft run up the scale, felt as motion rather than heard as a melody, and back down for back.
  "swipe-forward": { notes: [G4, A4, C5, D5], step: 0.025, length: 0.1, gain: 0.1, sub: 0.1, cutoff: 4000, echo: false },
  "swipe-back": { notes: [D5, C5, A4, G4], step: 0.025, length: 0.1, gain: 0.1, sub: 0.1, cutoff: 4000, echo: false },
  // Octaves spreading open for a sheet or menu, and folding shut an octave lower for its close.
  open: { notes: [C4, G4, C5], step: 0.04, length: 0.2, gain: 0.16, sub: 0.3, cutoff: 5000, echo: false },
  close: { notes: [C4, G3, C3], step: 0.04, length: 0.2, gain: 0.21, sub: 0.3, cutoff: 3000, echo: false },
  // A step up that hangs unresolved on D while dragging, and a step back that lands home with weight.
  grab: { notes: [C5, D5], step: 0.04, length: 0.1, gain: 0.15, sub: 0.1, cutoff: 6000, echo: false },
  drop: { notes: [D5, C5], step: 0.04, length: 0.15, gain: 0.15, sub: 0.4, cutoff: 6000, echo: false },
  // One dull knock, for pressing something that can't be used right now.
  disabled: { notes: [C3], step: 0, length: 0.08, gain: 0.25, sub: 0.3, cutoff: 600, echo: false },
  // A quick step up a fourth.
  copy: { notes: [G4, C5], step: 0.05, length: 0.15, gain: 0.15, sub: 0.2, cutoff: 6000, echo: false },
  // A major third up, and the same third falling an octave lower and darker: final, but not a failure.
  add: { notes: [C5, E5], step: 0.05, length: 0.2, gain: 0.15, sub: 0.2, cutoff: 6000, echo: false },
  remove: { notes: [E4, C4], step: 0.05, length: 0.2, gain: 0.17, sub: 0.2, cutoff: 3000, echo: false },
  // Lower, minor and heavier than remove, as it can't be taken back.
  delete: { notes: [Eb4, C4], step: 0.05, length: 0.25, gain: 0.2, sub: 0.6, cutoff: 2000, echo: false },
  // Three steps back down to C and a little darker, and the same steps forward.
  undo: { notes: [E5, D5, C5], step: 0.04, length: 0.12, gain: 0.13, sub: 0.1, cutoff: 3000, echo: false },
  redo: { notes: [C5, D5, E5], step: 0.04, length: 0.12, gain: 0.13, sub: 0.1, cutoff: 6000, echo: false },
  // A quick octave lift away, and a quick fall that lands home on C.
  send: { notes: [G4, G5], step: 0.03, length: 0.12, gain: 0.15, sub: 0.1, cutoff: 6000, echo: false },
  receive: { notes: [G5, C5], step: 0.03, length: 0.12, gain: 0.15, sub: 0.1, cutoff: 6000, echo: false },
  // The full chord up to the octave, for finishing something that mattered.
  success: { notes: [C4, E4, G4, C5], step: 0.06, length: 0.6, gain: 0.18, sub: 0.6, cutoff: 6000, echo: true },
  // Its mirror, falling through C minor an octave lower, so it sits below the positive sounds.
  failure: { notes: [C4, G3, Eb3, C3], step: 0.06, length: 0.6, gain: 0.23, sub: 0.6, cutoff: 3000, echo: true },
  // Success carried on up to G5, with more weight and a longer ring.
  complete: { notes: [C4, E4, G4, C5, G5], step: 0.07, length: 0.8, gain: 0.16, sub: 0.8, cutoff: 6000, echo: true },
  // Two even hits on the minor third: a caution, not yet a failure.
  warning: { notes: [Eb4, Eb4], step: 0.12, length: 0.15, gain: 0.22, sub: 0.5, cutoff: 2000, echo: false },
  // Two muffled hits falling a semitone.
  error: { notes: [Db3, C3], step: 0.1, length: 0.3, gain: 0.35, sub: 1, cutoff: 900, echo: false },
  // An open fifth up.
  join: { notes: [A4, E5], step: 0.07, length: 0.5, gain: 0.27, sub: 0.6, cutoff: 6000, echo: true },
  // A fifth falling, an octave below join and a little darker.
  leave: { notes: [A3, D3], step: 0.07, length: 0.5, gain: 0.35, sub: 0.6, cutoff: 3000, echo: true },
  // A wide, quick leap up, to catch attention without alarm.
  notification: { notes: [G4, E5], step: 0.04, length: 0.4, gain: 0.26, sub: 0.4, cutoff: 6000, echo: true },
};

/**
 * A ring loops four bars of eight steps. A three-note figure bounces across the beat over a bass
 * whose fifth leads bars 1 and 3 into the next, and the chord changes for bars 3 and 4.
 */
type Ringtone = {
  /** The figure for bars 1–2, then for bars 3–4. */
  figures: [number[], number[]];
  /** The bass root and the fifth that leads on from it, for bars 1–2, then for bars 3–4. */
  bass: [[number, number], [number, number]];
};

const RINGTONES: Record<Ring, Ringtone> = {
  // C major 9, then A minor 9.
  ring: { figures: [[D5, B4, E4], [B4, G4, C4]], bass: [[C3, G3], [A2, E3]] },
  // C sus2, then F lydian.
  "ring-alt": { figures: [[D5, G4, C5], [B4, E4, A4]], bass: [[C3, G3], [F3, C3]] },
};

const STEP = 1 / 6;
const BAR = 8 * STEP;
const CYCLE = 4 * BAR;

type Overtone = {
  type: OscillatorType;
  /** Multiple of the note's frequency. */
  ratio: number;
  level: number;
  /** Fraction of the note's length it takes to die away. */
  decay: number;
};

type Instrument = {
  overtones: Overtone[];
  /** A lowpass on each note, closing from the first frequency to the second over half its length. */
  filter?: [number, number];
  /** Skips the echo, for instruments that should sound close and damped. */
  dry?: boolean;
};

const INSTRUMENTS: Record<Theme, Instrument> = {
  glass: {
    overtones: [
      { type: "sine", ratio: 1, level: 1, decay: 1 },
      { type: "sine", ratio: 2, level: 0.3, decay: 0.6 },
    ],
  },
  // The brightness closes as it decays, like a plucked string.
  string: {
    overtones: [{ type: "triangle", ratio: 1, level: 1, decay: 1 }],
    filter: [4000, 800],
  },
  // A marimba-like 4x partial that dies almost at once.
  wood: {
    overtones: [
      { type: "sine", ratio: 1, level: 1, decay: 1 },
      { type: "sine", ratio: 4, level: 0.4, decay: 0.15 },
    ],
    dry: true,
  },
};

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

/** A 4ms attack up to `peak`, then an exponential fall to silence over `length` seconds. */
function envelope(param: AudioParam, at: number, peak: number, length: number) {
  param.setValueAtTime(0, at);
  param.linearRampToValueAtTime(peak, at + 0.004);
  param.exponentialRampToValueAtTime(0.0001, at + length);
}

function note(ctx: BaseAudioContext, out: AudioNode, theme: Theme, midi: number, at: number, length: number, gain: number) {
  const { overtones, filter } = INSTRUMENTS[theme];
  let input = out;
  if (filter) {
    const lowpass = ctx.createBiquadFilter();
    lowpass.frequency.setValueAtTime(filter[0], at);
    lowpass.frequency.exponentialRampToValueAtTime(filter[1], at + length / 2);
    lowpass.connect(out);
    input = lowpass;
  }
  for (const p of overtones) {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = p.type;
    osc.frequency.value = hz(midi) * p.ratio;
    envelope(amp.gain, at, gain * p.level, length * p.decay);
    osc.connect(amp).connect(input);
    osc.start(at);
    osc.stop(at + length * p.decay);
  }
}

/** A C2 thump: the pitch drops into the note over 40ms, which reads as weight rather than a tone. */
function sub(ctx: BaseAudioContext, out: AudioNode, at: number, weight: number) {
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.frequency.setValueAtTime(hz(C2) * 1.5, at);
  osc.frequency.exponentialRampToValueAtTime(hz(C2), at + 0.04);
  envelope(amp.gain, at, 0.5 * weight, 0.25);
  osc.connect(amp).connect(out);
  osc.start(at);
  osc.stop(at + 0.25);
}

/** A 160ms echo whose repeats darken as they fade. */
function echo(ctx: BaseAudioContext, from: AudioNode, out: AudioNode) {
  const send = ctx.createGain();
  const delay = ctx.createDelay();
  const tone = ctx.createBiquadFilter();
  const feedback = ctx.createGain();
  send.gain.value = 0.3;
  delay.delayTime.value = 0.16;
  tone.frequency.value = 2500;
  feedback.gain.value = 0.3;
  from.connect(send).connect(delay).connect(tone).connect(out);
  tone.connect(feedback).connect(delay);
}

/** One cycle of a ring, starting at `at`. */
function ring(ctx: BaseAudioContext, out: AudioNode, theme: Theme, { figures, bass }: Ringtone, at: number) {
  for (let bar = 0; bar < 4; bar++) {
    const figure = figures[bar < 2 ? 0 : 1];
    const [root, fifth] = bass[bar < 2 ? 0 : 1];
    const start = at + bar * BAR;
    // Bars 1 and 3 leave their last two steps to the bass's lead-in; bars 2 and 4 carry the figure through.
    const leads = bar % 2 === 0;
    for (let i = 0; i < (leads ? 6 : 8); i++) {
      note(ctx, out, theme, figure[i % 3], start + i * STEP, 0.25, 0.16 * 0.88 ** i);
    }
    sub(ctx, out, start, 0.3);
    note(ctx, out, theme, root, start, 0.25, 0.2);
    note(ctx, out, theme, root, start + 2 * STEP, 0.25, 0.08);
    if (leads) note(ctx, out, theme, fifth, start + 6 * STEP, 0.25, 0.18);
  }
}

const isRing = (sound: Sound): sound is Ring => sound in RINGTONES;

let volume = 0.25;
let output: { ctx: AudioContext; master: GainNode } | undefined;

/** Made on the first tap or play, as browsers only let a gesture start audio. */
function audio() {
  if (!output) {
    const ctx = new AudioContext();
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -6;
    limiter.connect(ctx.destination);
    const master = ctx.createGain();
    master.gain.value = volume;
    master.connect(limiter);
    output = { ctx, master };
  }
  return output;
}

// iOS drops sounds started after an await unless an earlier gesture woke the context. A touch only
// counts as one on release, so pointerdown covers the mouse and pointerup covers touch and pen.
// This only serves play(), so a bundler may drop it along with an unused import (hence sideEffects: false).
if (typeof window !== "undefined") {
  for (const type of ["pointerdown", "pointerup", "keydown"]) {
    window.addEventListener(type, () => void audio().ctx.resume(), { passive: true });
  }
}

/** Sets the master volume from 0 (silent) to 1. Defaults to 0.25, as full scale is loud for UI. */
export function setVolume(level: number) {
  // NaN would get past the clamp, and an AudioParam throws on it.
  if (Number.isNaN(level)) throw new RangeError("Volume must be a number from 0 to 1.");
  volume = Math.min(Math.max(level, 0), 1);
  if (output) output.master.gain.value = volume;
}

/** Plays a sound and returns a function that stops it. Rings repeat until that's called. */
export function play(sound: Sound, theme: Theme = "glass"): () => void {
  const { ctx, master } = audio();
  void ctx.resume();

  const at = ctx.currentTime + 0.01;
  const voice = ctx.createGain();
  voice.connect(master);
  let timer: ReturnType<typeof setTimeout> | undefined;

  if (isRing(sound)) {
    const ringtone = RINGTONES[sound];
    // Each cycle queues the next as it starts, so a throttled timer in a background tab can't leave a gap.
    const queue = (cycle: number) => {
      ring(ctx, voice, theme, ringtone, at + cycle * CYCLE);
      timer = setTimeout(() => queue(cycle + 1), (at + cycle * CYCLE - ctx.currentTime) * 1000);
    };
    queue(0);
  } else {
    const cue = CUES[sound];
    const tone = ctx.createBiquadFilter();
    tone.frequency.value = cue.cutoff;
    tone.connect(voice);
    if (cue.echo && !INSTRUMENTS[theme].dry) echo(ctx, tone, voice);

    if (cue.sub) sub(ctx, tone, at, cue.sub);
    cue.notes.forEach((midi, i) => note(ctx, tone, theme, midi, at + i * cue.step, cue.length, cue.gain));
  }

  return () => {
    clearTimeout(timer);
    // A short fade rather than a cut, which would click.
    voice.gain.setTargetAtTime(0, ctx.currentTime, 0.01);
  };
}
