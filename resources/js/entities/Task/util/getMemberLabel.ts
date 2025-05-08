export function getMemberLabel(maxMembers: number) {
  let memberText = "участник";

  if (maxMembers >= 2 && maxMembers <= 4) {
    memberText = "участника";
  } else {
    memberText = "участников";
  }

  return memberText;
}
