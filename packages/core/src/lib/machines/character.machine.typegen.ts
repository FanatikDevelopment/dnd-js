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
    guards: 'canStand';
    services: never;
  };
  eventsCausingActions: {
    initAction: 'init';
    reactionTriggerAction: 'reactionTrigger';
    startTurnAction: 'startTurn';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    canMove: 'move';
    canStand: 'standUp';
    canTakeAction: 'action';
    canTakeBonusAction: 'bonusAction';
    canTakeReaction: 'reactionTrigger';
    isSurprised: 'startCombat';
  };
  eventsCausingServices: {};
  matchesStates:
    | 'Idle'
    | 'NotInitialized'
    | 'Ready'
    | 'Surprised'
    | 'TurnStarted'
    | 'TurnStarted.Actions'
    | 'TurnStarted.Actions.ActionStarted'
    | 'TurnStarted.Actions.BonusActionStarted'
    | 'TurnStarted.Actions.Idle'
    | 'TurnStarted.Actions.ReactionStarted'
    | 'TurnStarted.Move'
    | 'TurnStarted.Move.Prone'
    | 'TurnStarted.Move.Standing'
    | {
        TurnStarted?:
          | 'Actions'
          | 'Move'
          | {
              Actions?:
                | 'ActionStarted'
                | 'BonusActionStarted'
                | 'Idle'
                | 'ReactionStarted';
              Move?: 'Prone' | 'Standing';
            };
      };
  tags: never;
}
