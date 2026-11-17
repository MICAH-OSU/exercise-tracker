// Stored dates are YYYY-MM-DD (what <input type="date"> produces);
// the table shows them as MM-DD-YY like the original assignment.
export function formatDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${m[2]}-${m[3]}-${m[1].slice(2)}` : iso;
}
