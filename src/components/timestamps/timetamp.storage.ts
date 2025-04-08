import { BaseTimeStamp } from '@templates/v0/base/timestamps';

export class DateStorage {
    private dates: BaseTimeStamp[] = [];

    addDate(date: BaseTimeStamp): void {
        this.dates.push(date);
    }

    getDates(): BaseTimeStamp[] {
        return this.dates;
    }

    clearDates(): void {
        this.dates = [];
    }
}