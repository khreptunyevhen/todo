import { weekday, months } from "./dateInfo";

export function getCurrentDate() {
  const d = new Date();
  let weekDay = weekday[d.getDay()];
  let month = months[d.getMonth()];
  let day = d.getDate();

  let currentData = `${weekDay}, ${day} ${month}`;

  return currentData;
}
