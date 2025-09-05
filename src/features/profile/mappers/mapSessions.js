// LineChart attend: { sessions:[{ day: 1..7, sessionLength }] }
export function mapSessions(api) {
  const sessions = api?.data?.sessions || [];
  return {
    sessions: sessions.map((s) => ({
      day: Number(s.day) || 0,
      sessionLength: Number(s.sessionLength) || 0
    }))
  };
}
