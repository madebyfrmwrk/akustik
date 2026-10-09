# akustik

Synthesized UI sound effects with themes. Every sound is generated live with the Web Audio API: no audio files, no dependencies.

```sh
npm install akustik
```

```ts
import { play, setVolume } from "akustik";

play("success");
play("toggle-on", "wood");
setVolume(0.5);

// Rings repeat until stopped.
const stop = play("ring-warm");
stop(); // when the call is answered or declined
```

## Sounds

All sounds share one key (C) and one sub-bass layer, so they belong together. Rising, major notes read as positive; falling, minor or muffled ones read as negative. Most sounds come in mirrored pairs.

| Group | Sounds |
| --- | --- |
| Interaction | `tap`, `tick`, `select` / `deselect`, `toggle-on` / `toggle-off`, `swipe-forward` / `swipe-back`, `open` / `close`, `grab` / `drop`, `disabled` |
| Actions | `copy`, `add` / `remove`, `delete`, `undo` / `redo`, `send` / `receive` |
| Outcomes | `success` / `failure`, `complete`, `warning`, `error` |
| Presence | `join` / `leave`, `notification` |
| Rings | `ring-warm`, `ring-moody`, `ring-float`, `ring-cool` |

Where two sounds look alike, pick by what happened:

- `select` picks an item; `toggle-on` switches a setting.
- `remove` takes an item out; `delete` destroys it for good.
- `receive` is a message in the open conversation; `notification` asks for attention.
- `success` means an action worked; `complete` means a whole task or flow is finished.
- `failure` means the user's action didn't work; `error` means the system broke.

The rings are for an incoming call. Each loops a four-bar phrase until stopped: `play` returns a function that stops the sound, fading it out rather than cutting it. One-shot sounds return one too, for cutting them short.

There is deliberately no hover sound. It fires constantly and quickly becomes noise.

## Themes

A theme changes the instrument, never the meaning, so every sound works in every theme.

- `glass` (default): a clear sine with a soft harmonic and a short echo.
- `string`: a plucked tone whose brightness closes as it decays.
- `wood`: a dry, marimba-like knock.

## Volume

`setVolume(level)` sets the master volume from 0 to 1. It defaults to 0.25, as full scale is loud for UI.

## Notes

- Safe to import during server rendering: nothing touches the browser until the first sound or gesture.
- Browsers only start audio after a user gesture. akustik wakes audio on the first tap, click or key press, so sounds played later, such as after a network response, still play on iOS.

## License

MIT
