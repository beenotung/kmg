import {CompanyType} from "./company.type";
import {Matrix} from "./shared.type";

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
