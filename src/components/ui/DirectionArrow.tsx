export function DirectionArrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className="direction-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? "M5 19L19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} /></svg>;
}
