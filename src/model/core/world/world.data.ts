import {ActionType, Card, CardType, CompanyType, Matrix, MatrixType} from "./world.type";

export const Cards: Card[] = [
  new Card(ActionType.socialization, "Brain-storming", [
    {type: MatrixType.tacitKnowledge, amount: +10}])
  , new Card(ActionType.socialization, "Communities of practice", [
    {type: MatrixType.tacitKnowledge, amount: +10}])
  , new Card(ActionType.socialization, "Apprenticeship", [
    {type: MatrixType.tacitKnowledge, amount: +10}])
  , new Card(ActionType.socialization, "Seminars", [
    {type: MatrixType.tacitKnowledge, amount: +5}])
  , new Card(ActionType.socialization, "Interview", [
    {type: MatrixType.tacitKnowledge, amount: +15}])
  , new Card(ActionType.socialization, "Storytelling", [
    {type: MatrixType.tacitKnowledge, amount: +3}])
  , new Card(ActionType.socialization, "Observing", [
    {type: MatrixType.tacitKnowledge, amount: +5}])
  , new Card(ActionType.socialization, "Imitating", [
    {type: MatrixType.tacitKnowledge, amount: +3}])

  , new Card(ActionType.externalization, "Documentation", [
    {type: MatrixType.explicitKnowledge, amount: +15}
    , {type: MatrixType.tacitKnowledge, amount: -5}
    , {type: MatrixType.captial, amount: +1}
  ])
  , new Card(ActionType.externalization, "Archive", [
    {type: MatrixType.explicitKnowledge, amount: +10}
    , {type: MatrixType.tacitKnowledge, amount: -5}
    , {type: MatrixType.captial, amount: +2}
  ])
  , new Card(ActionType.externalization, "Library", [
    {type: MatrixType.explicitKnowledge, amount: +10}
    , {type: MatrixType.marketShare, amount: +1}
    , {type: MatrixType.tacitKnowledge, amount: -5}
  ])
  , new Card(ActionType.externalization, "Video Record", [
    {type: MatrixType.explicitKnowledge, amount: +10}
    , {type: MatrixType.tacitKnowledge, amount: -5}
  ])
  , new Card(ActionType.externalization, "Hackathon", [
    {type: MatrixType.explicitKnowledge, amount: +20}
    , {type: MatrixType.tacitKnowledge, amount: +5}
  ])
  , new Card(ActionType.externalization, "Modeling", [
    {type: MatrixType.explicitKnowledge, amount: +10}
    , {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(ActionType.externalization, "Creating metaphors", [
    {type: MatrixType.explicitKnowledge, amount: +10}
    , {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(ActionType.externalization, "Analogic", [
    {type: MatrixType.explicitKnowledge, amount: +15}
    , {type: MatrixType.marketShare, amount: +3}
  ])

  , new Card(ActionType.combination, "Text mining", [
    {type: MatrixType.explicitKnowledge, amount: +10}
  ])
  , new Card(ActionType.combination, "Intranet", [
    {type: MatrixType.explicitKnowledge, amount: +10}
  ])
  , new Card(ActionType.combination, "Database", [
    {type: MatrixType.explicitKnowledge, amount: +20}
  ])
  , new Card(ActionType.combination, "Cluster Data", [
    {type: MatrixType.explicitKnowledge, amount: +20}
    , {type: MatrixType.captial, amount: +1}
  ])
  , new Card(ActionType.combination, "Sorting", [
    {type: MatrixType.explicitKnowledge, amount: +1}
    , {type: MatrixType.marketShare, amount: +1}
    , {type: MatrixType.captial, amount: +1.2}
  ])
  , new Card(ActionType.combination, "Adding", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(ActionType.combination, "Categorizing", [
    {type: MatrixType.explicitKnowledge, amount: +5}
    , {type: MatrixType.captial, amount: +1.1}
  ])
  , new Card(ActionType.combination, "Methodology", [
    {type: MatrixType.explicitKnowledge, amount: +5}
    , {type: MatrixType.captial, amount: +1.5}
  ])
  , new Card(ActionType.combination, "Best practices", [
    {type: MatrixType.captial, amount: +1.5}
    , {type: MatrixType.marketShare, amount: +5}
  ])

  , new Card(ActionType.internalization, "Lesson Learned", [
    , {type: MatrixType.tacitKnowledge, amount: -10}
  ])
  , new Card(ActionType.internalization, "E-Learning", [
    {type: MatrixType.tacitKnowledge, amount: +10}
  ])
  , new Card(ActionType.internalization, "Article, Paper", [
    , {type: MatrixType.tacitKnowledge, amount: +10}
    , {type: MatrixType.explicitKnowledge, amount: +10}
  ])
  , new Card(ActionType.internalization, "Data Visualization", [
    {type: MatrixType.tacitKnowledge, amount: +5}
    , {type: MatrixType.marketShare, amount: +5}
  ])
  , new Card(ActionType.internalization, "Access to codified knowledge", [
    {type: MatrixType.tacitKnowledge, amount: +2}
    , {type: MatrixType.marketShare, amount: +5}
    , {type: MatrixType.captial, amount: +1.1}
  ])
  , new Card(ActionType.internalization, "Goal based training", [
    {type: MatrixType.tacitKnowledge, amount: +20}
    , {type: MatrixType.marketShare, amount: +5}
    , {type: MatrixType.captial, amount: -5}
  ])

  , new Card(CardType.profit_portable, "Knowledge Retention", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(CardType.profit_portable, "Low employee turnover", [
    {type: MatrixType.captial, amount: +3}
  ])
  , new Card(CardType.profit_portable, "Research & Development", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(CardType.profit_portable, "Good learning culture", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(CardType.profit_portable, "Confidentiality agreement", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(CardType.profit_portable, "High external collaboration", [
    {type: MatrixType.captial, amount: +3}
  ])
  , new Card(CardType.profit_portable, "Proper IP handling", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(CardType.profit_portable, "Good talent management", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(CardType.profit_portable, "Adequate training", [
    {type: MatrixType.captial, amount: +3}
  ])

  , new Card(CardType.profit_transient, "Revenue Increase", [
    {type: MatrixType.captial, amount: +2}
  ])
  , new Card(CardType.profit_transient, "Innovation & Creative", [
    {type: MatrixType.captial, amount: +2}
  ])
  , new Card(CardType.profit_transient, "Increase Efficiency", [
    {type: MatrixType.captial, amount: +2}
  ])
  , new Card(CardType.profit_transient, "Better problem-solving skills", [
    {type: MatrixType.captial, amount: +1}
  ])
  , new Card(CardType.profit_transient, "Increase Market Share", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(CardType.profit_transient, "Better & faster decision making", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(CardType.profit_transient, "Quality Improved", [
    {type: MatrixType.marketShare, amount: +2}
  ])
  , new Card(CardType.profit_transient, "Avoid making the same mistakes", [
    {type: MatrixType.captial, amount: +3}
  ])

  , new Card(CardType.risk, "Knowledge Deficiency", [
    {type: MatrixType.captial, amount: -3}
  ])
  , new Card(CardType.risk, "Knowledge Loss", [
    {type: MatrixType.explicitKnowledge, amount: -5}
  ])
  , new Card(CardType.risk, "Knowledge Leakage", [
    {type: MatrixType.explicitKnowledge, amount: -5}
  ])
  , new Card(CardType.risk, "Knowledge Obsolescence", [
    {type: MatrixType.marketShare, amount: -3}
  ])
];

export const InitialMatrixMap = new Map<CompanyType, Matrix>();
{
  InitialMatrixMap.set(CompanyType.Publishing, {
    tacitKnowledge: 25,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 2.5
  });
  InitialMatrixMap.set(CompanyType.MediaFirm, {
    tacitKnowledge: 40,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 1.5
  });
  InitialMatrixMap.set(CompanyType.ITCompany, {
    tacitKnowledge: 30,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 2.0
  });
  InitialMatrixMap.set(CompanyType.Education, {
    tacitKnowledge: 45,
    explicitKnowledge: 0,
    marketShare: 0,
    capital: 1.0
  });
}
