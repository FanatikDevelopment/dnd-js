import { createMachine } from 'xstate';
import { Combatant } from './types';

export type CombatEvent =
  | {
      type: 'dropProne';
    }
  | {
      type: 'standUp';
    };

export type CharacterContext = {
  character?: Combatant;
  isSurprised: boolean;
  remainingMove: number;
  remainingActions: number;
  remainingBonusActions: number;
  remainingReactions: number;
};

export const moveMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMAWBDATu5AXMmAdAHID2uAkgHYCWuN6ANjQF6QDENtuA2gAwBdRKAAOpWHRqkqwkAA9EARgCciwgA4A7ABZl6gKzrtAZkXHtANgBMAGhABPJZs2E+V8-r671fLWYC+-nZoWDj4RBQQjGDssLhYuADCpAC2AEbovIKyYhL00rIKCNr62oQmOppWFsrKOlbado4IHoRVFvqa5hZGPlaBwRjYeASEkdGx8ZhJqRm8ikJIILmSBUtFJWUV2u219Y0OiFZuhFaeblaaKj4qFgMgIcPhhADKAK6YIpg0sBxgVBAACofKj8RaicSrGTrRAGMpGYyaNy1CwWJHqJqIYzuVx8PGI9Q+VG6e6PMKjABKYHQEHskwSwMwoOySxW+WhoCKZkUfA0mk8ik82L4ZgOzWx6jaxmxyk86lMl00pKG5KIVJpdP+EGS6UyYJykPZhVhpQ0FWRylR6MxCHUanObkM-MJhP6QQeKpGauptPYmGpeCkVEB3ygMEw+tZhqDxoQPL4LgMymMRjq1nxNoaVkIyncO2sHS6PO0ytCXsIjKoLym+Ag7C1lcjELyMZhceMnRzVkUhL4FhT+kUl0zmkl7mxFnzim0blLT1GlerCQ4KVIADcwE3ltG1pylPpEeULHxlHjaoKh-pM3oc-o9F0LIokYprHPVRWQUvphwwkGt2zWz3ONB0lQVrCsHx9GqKx3EzbRJRKe9aisVRlDfctFxrDg0mkN5YAAQUDaR-x3Dl5CUfNykRHY8VKO9ZRtFQXFlZCIP5apsWMdDnkw5c639X9pBDGgwwIEiW13ci4x2SVqMtRFjC8E9GJ2cp6JQnsdGMGo7nuKhSAgOBZDJL0DQksiigAWgsG1LP0HNakteVOjMG5dMGMtnjIShuAYZg2AgMyoVjbRbEOBBjl5M5aOTA9n0sbjRnGMAgqNNtsRcbZ1A6HpTG0MUjjxU5zhgq49BFS1EqId5Pm+X5AqjczYy6KLNMHEwnxAm1ulOapOm6XpZ3dEznnVWlUsAqSeRvbSqj7ZN5VzZRupMPlC2cftfH5Eths9HjPywhrm2CttBTvQgnx7cw9GMPQD2601ENPW6U3qQJAiAA */
    id: 'move',
    initial: 'Standing',
    schema: {
      events: {} as CombatEvent,
    },
    tsTypes: {} as import('./move.machine.typegen').Typegen0,
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
  {
    guards: {
      canStand: (context, event) => {
        return false;
      },
    },
  }
);
