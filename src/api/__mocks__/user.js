export const mockUser = (id = 12) => ({
  data: {
    id,
    userInfos: {firstName: "Thomas", lastName: "Dovineau", age: 31},
    todayScore: 0.29,
    keyData: {calorieCount: 2330, proteinCount: 185, carbohydrateCount: 270, lipidCount: 70}
  }
});

export const mockActivity = {
  data: {
    sessions: [
      {day: "2020-07-01", kilogram: 80, calories: 240},
      {day: "2020-07-02", kilogram: 80, calories: 220},
      {day: "2020-07-03", kilogram: 81, calories: 280},
      {day: "2020-07-04", kilogram: 81, calories: 290},
      {day: "2020-07-05", kilogram: 80, calories: 160},
      {day: "2020-07-06", kilogram: 78, calories: 162},
      {day: "2020-07-07", kilogram: 76, calories: 390},
      {day: "2020-07-08", kilogram: 76, calories: 390},
      {day: "2020-07-09", kilogram: 76, calories: 390},
      {day: "2020-07-10", kilogram: 76, calories: 390}
    ]
  }
};

export const mockSessions = {
  data: {
    sessions: [
      {day: 1, sessionLength: 60},
      {day: 2, sessionLength: 50},
      {day: 3, sessionLength: 45},
      {day: 4, sessionLength: 50},
      {day: 5, sessionLength: 20},
      {day: 6, sessionLength: 10},
      {day: 7, sessionLength: 60}
    ]
  }
};

export const mockPerformance = {
  data: {
    kind: {1: "cardio", 2: "energy", 3: "endurance", 4: "strength", 5: "speed", 6: "intensity"},
    data: [
      {value: 80, kind: 1},
      {value: 120, kind: 2},
      {value: 140, kind: 3},
      {value: 50, kind: 4},
      {value: 200, kind: 5},
      {value: 90, kind: 6}
    ]
  }
};
