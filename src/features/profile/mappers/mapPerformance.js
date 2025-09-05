// RadarChart attend: { kind:{}, data:[{ value, kind }] } (puis UI réordonne)
export function mapPerformance(api) {
  const data = api?.data?.data || [];
  const kind = api?.data?.kind || {};
  return {
    kind,
    data: data.map((d) => ({value: Number(d.value) || 0, kind: Number(d.kind) || 0}))
  };
}
