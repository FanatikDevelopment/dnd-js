export const MusicalInstrumentNames = [
  'bagpipe',
  'drum',
  'dulcimer',
  'flute',
  'horn',
  'lute',
  'lyre',
  'pan-flute',
  'shawm',
  'viol',
] as const;

type MusicalInstrumentNamesTuple = typeof MusicalInstrumentNames;
export type MusicalInstrumentName = MusicalInstrumentNamesTuple[number];
