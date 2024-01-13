export function convertUnixToDate(unixTimestamp: string) {
  const date = new Date(Number(unixTimestamp) * 1000);
  return date.toLocaleDateString();
}

export function timeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return date.toLocaleDateString();
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} meses`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} días`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} horas`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutos`;
  }
  return `${Math.floor(seconds)} segundos`;
}

export function convertDuration(duration: string) {
  const totalSeconds = Number(duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes} minutos ${seconds} segundos`;
}
