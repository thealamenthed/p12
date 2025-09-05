export function mapUser(api) {
  const d = api?.data || {};
  const infos = d.userInfos || {};
  // 'todayScore' OU 'score' selon l'API
  const score = typeof d.todayScore === "number" ? d.todayScore : d.score ?? 0;
  return {
    id: d.id,
    firstName: infos.firstName || "Utilisateur",
    keyData: {
      calories: d.keyData?.calorieCount ?? 0,
      proteins: d.keyData?.proteinCount ?? 0,
      carbs: d.keyData?.carbohydrateCount ?? 0,
      lipids: d.keyData?.lipidCount ?? 0
    },
    score
  };
}
