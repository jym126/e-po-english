export interface Agenda{
    event?: Event[];
}



export interface Event {
    id?: number;
    title: string;
    desc: string;
    startTime: Date;
    endTime: Date;
    startHour: null;
    endHour: string;
    allDay: true;
  }
