import {ActionType, Card, CompanyType, Matrix, MatrixType} from "./world.type";

export const Cards: Card[] = [
  new Card(ActionType.socialization, "Brain-storming", [{type: MatrixType.tacitKnowledge, amount: 10}])
  , new Card(ActionType.socialization, "Communities of practice", [{type: MatrixType.tacitKnowledge, amount: 10}])
];

export const InitialMatrixMap = new Map<CompanyType, Matrix>();
{
  InitialMatrixMap.set(CompanyType.Publishing, {
    tacitKnowledge: 25,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 2.5
  });
  InitialMatrixMap.set(CompanyType.Publishing, {
    tacitKnowledge: 40,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 1.5
  });
  InitialMatrixMap.set(CompanyType.Publishing, {
    tacitKnowledge: 30,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 2.0
  });
  InitialMatrixMap.set(CompanyType.Publishing, {
    tacitKnowledge: 45,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 1.0
  });
}
