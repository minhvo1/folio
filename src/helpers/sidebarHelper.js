
export function getCompetitions (userComp, allComp) {
  let listComp = [];

  if(userComp.length = 0) {
    return null;
  }
  for (let indivComp of userComp) {
    listComp.push(indivComp.competition_id);
  }
  let res = allComp.filter(item => listComp.includes(item.id));

  return res;
}