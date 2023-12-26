import { createMachine } from 'xstate';
import { Combatant } from './types';

export type CombatEvent =
  | {
      type: 'init';
      combatant: Combatant;
      isSurprized: boolean;
    }
  | {
      type: 'startCombat';
    }
  | {
      type: 'endTurn';
    }
  | {
      type: 'startTurn';
    }
  | {
      type: 'endCombat';
    }
  | {
      type: 'move';
      cost: number;
    }
  | {
      type: 'action';
    }
  | {
      type: 'bonusAction';
    }
  | {
      type: 'reactionTrigger';
      name: string;
      source: unknown;
    }
  | {
      type: 'dropProne';
    }
  | {
      type: 'standUp';
    }
  | { type: 'takeAction' }
  | { type: 'takeBonusAction' }
  | { type: 'takeReaction' }
  | { type: 'endAction' }
  | { type: 'endBonusAction' }
  | { type: 'endReaction' };

export type CharacterContext = {
  character?: Combatant;
  isSurprised: boolean;
  remainingMove: number;
  remainingActions: number;
  remainingBonusActions: number;
  remainingReactions: number;
};

export const characterMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDATu5AXMmAdAHID2uAkgHYCWuN6ANjQF6QDENtuA2gAwBdRKAAOpWHRqkqwkAA9EARgCciwgA4A7AFY+igEzrFAFl3rl+gDQgAnks2bCffQGZTfbfoBsigwF8-azQsHHwiCghGMHZYXCxcAGFSAFsAI3ReQVkxCXppWQUEU2NCYxcdfW1tdRcXH29rOwQXVyc+dsUvF3VjfU1O7QCgjGw8AkIIqJi4zESU9N5FISQQHMl8lcKvK1slPgdCL2qWzXNenXUhkGDRsMIAZQBXTBFMGlgOMCoIABVnqn4y1E4nWMk2iE8jSUBnUhEUx166i8yJc1SuN1C4wASmB0BAbNN4n9MACsis1nkwaAti5lE4XAYvMoavpVMooQgDMpHOYegZNPpnOpLoFriNMUQcXiCV8IEk0hlAdkQZSCohiqVyp4qjU6oyOUZCLp2vpekc+FodOjxWNJbj8exMLi8FIqD83lAYJgleSVa61c1tF4nPCfHV1B4+BYvAaBW1tIpNHxasn9sprSFbYRiVR7jN8BB2LKcz7gbl-eCEF06cnGcyWmyOcpkRpNMZmcp9op9kyM7dxjm8-EOMlSAA3MCl1Z+jbUvZtwhJhm6LwOIwNXYIHSOZS75nGJHd-YuPsS7P-IezDihV1TikVuecjzaQi0nqnWl1ZTGDlJxztvc+mMRR1FcE9RQxLNB3zDhUmkR5YAAQRdaQ7xnKl5D2RQXEOTRuRcPgvHcMof03I5HHaE03AueF0wgm07mg4dCydG9pHdGhPQINDy1nTCn3hQ5E30ETlDfPCXA5LxCKNSiLV0NwqkGejM0Yi8YIgQgAFlxzAB44m+LgoHYCBMFIEQAAUzKoScyTLUEA13YNtDEpkiM7Dwjg5I99EIPduRUVwVFOU8oPU5jtN0wgrOkaJYnQb4AFURB4hzKyco1XObdt2iDbQm08Uo9yDZQzC1UK1JJS8C0IZDKVgCZImiOIAGswDq287OnXiMMKbs6kyr93Ny5FvOAl8AICnQjiOfQKoHcKr00jrpAayZmvQNqACF4KQlDSSBbq0sffrnKy4bPJjTcDGword20bdqN7FT+yIJiltq-a1qa9hWrAKV9tS1VK1Owa3Jyy7vIZEpJqI5FdH0RR5rexaapWqgGvR6rPm+dGgYffju3UF99y-UDCJcxQoaIvy9zwrpNG6bDkfPKqNM++rCB2qgEKxjSi2+bnecBrr7z4vq+GMPhZI6PoeiDAVvM6Xz-KOYpWUMFn3rRr7CABylscLWV9c6w6xd6vYmU1HRJZcoxk3y67vBw-yBW0Uwak0AJRSoUgIDgWRILCZUeoDABaK6mgjlmyEobgGGYNgIBD47+N6DlBWlypKOFZko3hFn1pT4HHxOa3tC1aoHvhSTN0zwhs-aXOI1UZThlU8YnheN4PmT31Q8rRms5AhwiNZdtTA5FocONPQuh6PoBhZqV8WLgnCjNI1XGMJMXLbUqvM3bkVeOU1zDzuotdRyA1-FxAHBnsSdGA-ofFK38Dkm3ddTqTQvCvtmEUdITlvhbBAoE1AuS1C-ToKhHZNCRCUV2NQLDdkqAA3M7NgF6SHIZKgUBQEBiRHSKBz9EywPfkfaoRoWQWAcAfXoGDDaRQnNFayYBCEg0RtLU4Bh2zYWbLSSOiBmxqAtLUVw2djDIiYezdG8B+6p0KBAwaZDX5wO8vsCae4kTmCUnhWREV5GNSiJwx8xDVHu3IW-eBSgpbS27P0KM3giJ1DbmKDuKNAEfWMXzZiZjCYiRwtsY0poK6oNrk0Ew3ZSidC6C5OW3RwLt1eqzTBRjdZCz2gbDSAS+pBMOI3MJtJEaRKUIKWEwFkSIzbDvdxQcFreJ1pzE20hDZ5PKa0EJJpTAlOwlDKMsTqnCjqOPOa3sgA */
    id: 'character',
    initial: 'NotInitialized',
    context: {
      isSurprised: false,
      remainingMove: 0,
      remainingActions: 0,
      remainingBonusActions: 0,
      remainingReactions: 0,
    } as CharacterContext,
    schema: {
      events: {} as CombatEvent,
    },
    tsTypes: {} as import('./character.machine.typegen').Typegen0,
    states: {
      NotInitialized: {
        on: {
          init: {
            target: 'Idle',
            actions: 'initAction',
          },
        },
      },
      Idle: {
        on: {
          startCombat: [
            {
              target: 'Surprised',
              cond: 'isSurprised',
            },
            'Ready',
          ],
        },
      },
      Surprised: {
        on: {
          endTurn: {
            target: 'Ready',
            actions: (context) => {
              context.isSurprised = false;
            },
          },
        },
      },
      Ready: {
        on: {
          startTurn: { target: 'TurnStarted', actions: 'startTurnAction' },
          endCombat: 'Idle',
          reactionTrigger: {
            target: 'Ready',
            cond: 'canTakeReaction',
            actions: 'reactionTriggerAction',
          },
        },
      },

      TurnStarted: {
        type: 'parallel',
        on: {
          endTurn: 'Ready',
          move: [{ target: 'TurnStarted', cond: 'canMove' }],
          action: [{ target: 'TurnStarted', cond: 'canTakeAction' }],
          bonusAction: [{ target: 'TurnStarted', cond: 'canTakeBonusAction' }],
          reactionTrigger: {
            target: 'TurnStarted',
            cond: 'canTakeReaction',
          },
        },

        states: {
          Move: {
            initial: 'Standing',
            states: {
              Standing: {
                on: {
                  dropProne: 'Prone',
                },
              },
              Prone: {
                on: {
                  standUp: {
                    target: 'Standing',
                    cond: 'canStand',
                  },
                },
              },
            },
          },
          Actions: {
            initial: 'Idle',
            states: {
              Idle: {
                on: {
                  takeAction: 'ActionStarted',
                  takeBonusAction: 'BonusActionStarted',
                  takeReaction: 'ReactionStarted',
                },
              },
              ActionStarted: {
                on: {
                  endAction: 'Idle',
                },
              },
              BonusActionStarted: {
                on: {
                  endBonusAction: 'Idle',
                },
              },
              ReactionStarted: {
                on: {
                  endReaction: 'Idle',
                },
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      initAction: (context, event) => {
        context.character = event.combatant;
        context.isSurprised = event.isSurprized;
      },
      startTurnAction: ({ character, ...context }) => {
        if (!character) {
          return;
        }

        context.remainingActions = character.actions;
        context.remainingBonusActions = character.bonusActions;
        context.remainingMove = character.move;
        context.remainingReactions = 1;
      },
      reactionTriggerAction: ({ character, ...context }, event) => {
        if (!character) {
          return;
        }

        if (character.onReactionTrigger(event.source, event)) {
          context.remainingReactions--;
        }
      },
    },
    guards: {
      isSurprised: (context) => context.isSurprised,
      canMove: (context, event) => {
        if (!context.character || context.isSurprised) {
          return false;
        }

        return context.remainingMove >= event.cost;
      },
      canTakeAction: (context) => {
        if (!context.character || context.isSurprised) {
          return false;
        }

        return context.remainingActions > 0;
      },
      canTakeBonusAction: (context) => {
        if (!context.character || context.isSurprised) {
          return false;
        }

        return context.remainingBonusActions > 0;
      },
      canTakeReaction: (context) => {
        if (!context.character || context.isSurprised) {
          return false;
        }

        return context.remainingReactions > 0;
      },
    },
  }
);
