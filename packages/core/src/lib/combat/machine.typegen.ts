// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    nextRoundAction: 'nextRound';
    nextTurnAction: 'nextTurn';
    startCombatAction: 'startCombat';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    isLast: 'nextTurn';
    isWon: 'nextRound';
  };
  eventsCausingServices: {};
  matchesStates:
    | 'CombatEnd'
    | 'CombatStart'
    | 'RoundEnd'
    | 'RoundStart'
    | 'TurnEnd'
    | 'TurnStart';
  tags: never;
}
