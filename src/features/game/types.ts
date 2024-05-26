export type CellStatus = undefined | 'active' | 'user_score' | 'ai_score';

export type FieldCell = {
  uuid: string;
  status: CellStatus;
}
