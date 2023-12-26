import { createMachine } from 'xstate';
import { Combatant } from './types';

export type CombatEvent =
  | {
      type: 'startCombat';
      groups: [Combatant[], Combatant[]];
    }
  | {
      type: 'startTurn';
      combatant: string;
    }
  | { type: 'endTurn' }
  | { type: 'nextTurn' }
  | { type: 'nextRound' };

export type CombatContext = {
  groups: [Combatant[], Combatant[]];
  combatants: Map<string, { group: number; combatant: Combatant }>;
  order: string[];
  round: number;
  turn: number;
  currentIndex: number;
};

export const combatMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BbARgQwC4DoBhDHXAZV2wCdcBiWSm4rPAbQAYBdRUAB1VgBLXINQA7HiAAeiAKwA2AMz52igIwAmWQHZ5GgJyL9AFlkAaEAE9Ei4wA5821ZtkBfVxbQsCAJVQBXMQgKajoGUIAVfyoxDm4kEH4hEXFJGQR9HXxM9UUNPUMTcytEDTsNR3yFLXdPEjx8KJiQmlowIKbYrkkk4VEJBPT9eWN8WUNtHQKjUwtrBDs1MdqQL1JG6LEAUSDaMTApXE64noE+1MHENW19FXZ79l0DGdlFOdL2B3lvn9+f-RWawanR2ED2ByOm1YanifDOKQGoHS11uD3uT0KpjeJQQxn0FRR8jsk0B9V8ASCoPBhz8gQgJwSvQRaTkShU6i0GJe7wQGnYFRqHlWZPwtMpu32NIp9Jhp2S-RZCAUymcnOmRR5WgqJJWYlQEDgkiBuDl50R0kQAFp5DzraTvEQyS0TYz4QrLri1LJ8IpxopyuqsTzFNolvjhsS3ELjaLpc7TcyPYsHLJjESA88NTiysoNFU9FG6g7OvHXfKLkirp8HGp2IYM5jivMyt7tPnBUX1iCggn3ZXcRoefp2D6dZ2GmKIKDexWLQOHIp-anw-J2PI1Gobdm6-hN399wDoyLmKRp2WzYrk2M03YG9zt9qo+4gA */
    id: 'combat',
    context: {
      groups: [[], []],
      combatants: new Map<string, { group: number; combatant: Combatant }>(),
      order: [],
      round: 0,
      turn: 0,
      currentIndex: 0,
    } as CombatContext,
    schema: {
      events: {} as CombatEvent,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    initial: 'CombatStart',
    states: {
      CombatStart: {
        on: {
          startCombat: { target: 'RoundStart', actions: 'startCombatAction' },
        },
      },
      RoundStart: {
        on: {
          startTurn: { target: 'TurnStart' },
        },
      },
      TurnStart: {
        on: {
          endTurn: 'TurnEnd',
        },
      },
      TurnEnd: {
        on: {
          nextTurn: [
            {
              target: 'RoundEnd',
              cond: 'isLast',
            },
            {
              target: 'TurnStart',
              actions: 'nextTurnAction',
            },
          ],
        },
      },
      RoundEnd: {
        on: {
          nextRound: [
            {
              target: 'CombatEnd',
              cond: 'isWon',
            },
            { target: 'RoundStart', actions: 'nextRoundAction' },
          ],
        },
      },
      CombatEnd: {},
    },
  },
  {
    actions: {
      startCombatAction: (context, event) => {
        context.groups = event.groups;
        const sorted = [...event.groups[0], ...event.groups[1]].sort((a, b) => {
          let result = b.rollInitiative() - a.rollInitiative();
          if (result === 0) {
            result = b.rollInitiative() - a.rollInitiative();
          }

          return result;
        });

        context.groups.forEach((group, index) => {
          group.forEach((combatant) =>
            context.combatants.set(combatant.id, { group: index, combatant })
          );
        });

        context.order = sorted.map((combatant) => combatant.id);
        context.round = 0;
        context.turn = 0;
        context.currentIndex = 0;
      },

      nextTurnAction: (context) => {
        context.turn++;
        let found = context.currentIndex;
        let combatant = context.combatants.get(context.order[found]);
        while (
          found < context.order.length &&
          (!combatant || combatant.combatant.isDead)
        ) {
          found++;
          combatant = context.combatants.get(context.order[found]);
        }

        context.currentIndex = found;
      },

      nextRoundAction: (context) => {
        context.round++;
        context.turn = 0;
        context.currentIndex = 0;
        context.order = context.order.filter((id) => {
          const combatant = context.combatants.get(id)?.combatant;
          return combatant && !combatant.isDead;
        });
      },
    },
    guards: {
      isLast: ({ currentIndex, combatants, order }) => {
        for (let i = currentIndex + 1, imax = order.length; i < imax; ++i) {
          const combatant = combatants.get(order[i]);
          if (combatant && !combatant.combatant.isDead) {
            return false;
          }
        }

        return true;
      },
      isWon: ({ combatants, order }) => {
        let currentGroup: number | undefined;

        for (const id of order) {
          const combatant = combatants.get(id);
          if (!combatant || combatant.combatant.isDead) {
            continue;
          }

          if (!currentGroup) {
            currentGroup = combatant.group;
            continue;
          }

          if (currentGroup !== combatant.group) {
            return false;
          }
        }

        return currentGroup !== undefined;
      },
    },
  }
);
