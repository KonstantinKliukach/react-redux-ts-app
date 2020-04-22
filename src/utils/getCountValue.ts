/* eslint-disable max-len */
function addZero(n: number): string {
  return (n < 10 ? `0${n}` : `${n}`);
}

export default function getCountValue(dateStart: string): string {
  const seconds = addZero((Math.floor(((new Date().getTime() - new Date(dateStart).getTime()) / 1000) % 60)));
  const minutes = addZero((Math.floor(((new Date().getTime() - new Date(dateStart).getTime()) / (1000 * 60)) % 60)));
  const hours = addZero((Math.floor(((new Date().getTime() - new Date(dateStart).getTime()) / (1000 * 60 * 60)) % 60)));
  return `${hours}:${minutes}:${seconds}`;
}
