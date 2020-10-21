export default class DateConversion {
  timeStamp(date) {
    const current = new Date(date);
    const timeStamp = current.toLocaleDateString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const [year, month, dayTime] = timeStamp.split('-');
    const [day, timeZone] = dayTime.split(' ');

    return `${year}-${
      Number(month) < 10 ? `0${month}` : month
    }-${day}T${timeZone}.000`;
  }
}
