export const STAFF_EMAILS = [
  "wink.at.riah@gmail.com",
  "gcastanon28@gmail.com",
  "mariahcastanon12@gmail.com",
];

export function isStaffEmail(email?: string | null) {
  if (!email) return false;

  return STAFF_EMAILS.includes(email.trim().toLowerCase());
}
