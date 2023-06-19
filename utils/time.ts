import moment from "moment";

export function ConvertTimeToDaysOrHours(date: Date): string {
  return moment().diff(moment(date), "days") === 0
    ? moment().diff(moment(date), "hours").toString() + "h"
    : moment().diff(moment(date), "d").toString() + "d";
}
