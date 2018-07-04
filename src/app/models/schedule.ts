export class Schedule {
    slot: string[];
    date: string;
    pointer: number;
    constructor( sl: string[], dt: string) {
            this.slot = sl;
            this.date = dt;
            this.pointer = 0;
    }
    nextSchedule() {
        const date = new Date(this.date);
        const max = this.slot.length;
        if (this.pointer < max ) {
            const obj =  {
                slot: this.slot[this.pointer],
                day: this.date
            };
            this.pointer++;
            return obj;
        } else {
            this.pointer = 0;
            const temp = date.setDate(date.getDate() + 1);
            this.date = new Date(temp).toISOString();
            const obj =  {
                slot: this.slot[this.pointer],
                day: this.date
            };
            this.pointer++;
            return obj;
        }
    }
}
