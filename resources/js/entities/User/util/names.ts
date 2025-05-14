export function getAvatartName(firstName: string, lastName: string | null) {
  if (lastName) {
    return `${firstName[0]}${lastName[0]}`;
  }
  return firstName[0];
}

export function getFullName(
  firstName: string,
  secondName: string,
  lastName: string | null
) {
  if (lastName) {
    return `${secondName} ${firstName} ${lastName}`;
  }
  return `${secondName} ${firstName}`;
}

export function getShortName(
  firstName: string,
  secondName: string,
  lastName: string | null
) {
  if (lastName) {
    return `${secondName} ${firstName[0]}.${lastName[0]}.`;
  }
  return `${secondName} ${firstName[0]}.`;
}
