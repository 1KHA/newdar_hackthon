/**
 * The hackathon tracks — single source of truth.
 *
 * These exact strings are what the registration form submits and what is stored
 * on `Team.hackathonTrack` (and mirrored into the legacy `challenge` column), so
 * every selector, filter and per-track count in the app must render from this
 * list. Diverging copies are why the admin dashboard used to filter and count by
 * tracks no team could ever have.
 *
 * Order follows the registration form.
 */
export const HACKATHON_TRACKS = [
  'تعزيز الدمج المجتمعي لكبار السن والمكفوفين',
  'إثراء تجربة ضيوف الرحمن في المدن المقدسة',
  'الحلول الاجتماعية المستدامة',
] as const;

export type HackathonTrack = (typeof HACKATHON_TRACKS)[number];

/** True when `value` is one of the current tracks. */
export function isHackathonTrack(value: unknown): value is HackathonTrack {
  return typeof value === 'string' && (HACKATHON_TRACKS as readonly string[]).includes(value);
}
