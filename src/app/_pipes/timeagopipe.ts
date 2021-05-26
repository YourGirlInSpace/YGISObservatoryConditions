import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeAgo',
    pure: false
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: Date, ...args: any[]) : string {
        var result: string;

        let now = new Date().getTime();

        let delta = (now - new Date(value).getTime()) / 1000;

        // format string
        if (delta < 10) {
            result = 'now';
        } else if (delta < 60) { // sent in last minute
            result = Math.floor(delta) + ' seconds ago';
        } else if (delta < 3600) { // sent in last hour
            var numMinutes = Math.floor(delta/60);

            result = numMinutes + ' minute' + (numMinutes > 1 ? 's' : '') + ' ago';
        } else if (delta < 86400) { // sent on last day
            var numHours = Math.floor(delta/3600);

            result = numHours + ' hour' + (numHours > 1 ? 's' : '') + ' ago';
        } else { // sent more than one day ago
            var numDays = Math.floor(delta/86400);

            result = numDays + ' day' + (numDays > 1 ? 's' : '') + ' ago';
        }

        return result;
    }
}