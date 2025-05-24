export function getMemberLabel(maxMembers: number) {
  let memberText;

  if (maxMembers === 1) {
    memberText = "участник";
  } else if (maxMembers >= 2 && maxMembers <= 4) {
    memberText = "участника";
  } else {
    memberText = "участников";
  }

  return memberText;
}
