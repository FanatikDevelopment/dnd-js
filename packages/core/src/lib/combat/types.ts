export interface Combatant {
  id: string;
  isDead: boolean;
  move: number;
  actions: number;
  bonusActions: number;

  rollInitiative(): number;
  onReactionTrigger(
    source: unknown,
    event: unknown,
    ...args: unknown[]
  ): boolean;
}
