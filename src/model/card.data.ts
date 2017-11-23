import {ActionType, Card, CardType, MatrixType, ProfitType} from "./card.type";

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
    , {type: MatrixType.capital, amount: +1}
  ])
  , new Card(ActionType.externalization, "Archive", [
    {type: MatrixType.explicitKnowledge, amount: +10}
    , {type: MatrixType.tacitKnowledge, amount: -5}
    , {type: MatrixType.capital, amount: +2}
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
    , {type: MatrixType.capital, amount: +1}
  ])
  , new Card(ActionType.combination, "Sorting", [
    {type: MatrixType.explicitKnowledge, amount: +1}
    , {type: MatrixType.marketShare, amount: +1}
    , {type: MatrixType.capital, amount: +1.2}
  ])
  , new Card(ActionType.combination, "Adding", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(ActionType.combination, "Categorizing", [
    {type: MatrixType.explicitKnowledge, amount: +5}
    , {type: MatrixType.capital, amount: +1.1}
  ])
  , new Card(ActionType.combination, "Methodology", [
    {type: MatrixType.explicitKnowledge, amount: +5}
    , {type: MatrixType.capital, amount: +1.5}
  ])
  , new Card(ActionType.combination, "Best practices", [
    {type: MatrixType.capital, amount: +1.5}
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
    , {type: MatrixType.capital, amount: +1.1}
  ])
  , new Card(ActionType.internalization, "Goal based training", [
    {type: MatrixType.tacitKnowledge, amount: +20}
    , {type: MatrixType.marketShare, amount: +5}
    , {type: MatrixType.capital, amount: -5}
  ])

  , new Card(ProfitType.portable_profit, "Knowledge Retention", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(ProfitType.portable_profit, "Low employee turnover", [
    {type: MatrixType.capital, amount: +3}
  ])
  , new Card(ProfitType.portable_profit, "Research & Development", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(ProfitType.portable_profit, "Good learning culture", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(ProfitType.portable_profit, "Confidentiality agreement", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(ProfitType.portable_profit, "High external collaboration", [
    {type: MatrixType.capital, amount: +3}
  ])
  , new Card(ProfitType.portable_profit, "Proper IP handling", [
    {type: MatrixType.explicitKnowledge, amount: +5}
  ])
  , new Card(ProfitType.portable_profit, "Good talent management", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(ProfitType.portable_profit, "Adequate training", [
    {type: MatrixType.capital, amount: +3}
  ])

  , new Card(ProfitType.transient_profit, "Revenue Increase", [
    {type: MatrixType.capital, amount: +2}
  ])
  , new Card(ProfitType.transient_profit, "Innovation & Creative", [
    {type: MatrixType.capital, amount: +2}
  ])
  , new Card(ProfitType.transient_profit, "Increase Efficiency", [
    {type: MatrixType.capital, amount: +2}
  ])
  , new Card(ProfitType.transient_profit, "Better problem-solving skills", [
    {type: MatrixType.capital, amount: +1}
  ])
  , new Card(ProfitType.transient_profit, "Increase Market Share", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(ProfitType.transient_profit, "Better & faster decision making", [
    {type: MatrixType.marketShare, amount: +3}
  ])
  , new Card(ProfitType.transient_profit, "Quality Improved", [
    {type: MatrixType.marketShare, amount: +2}
  ])
  , new Card(ProfitType.transient_profit, "Avoid making the same mistakes", [
    {type: MatrixType.capital, amount: +3}
  ])

  , new Card(CardType.risk, "Knowledge Deficiency", [
    {type: MatrixType.capital, amount: -3}
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
