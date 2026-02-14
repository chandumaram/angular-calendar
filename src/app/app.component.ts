import { Component } from '@angular/core';
import { MonthCalendarComponent } from './month-calendar/month-calendar.component';
import { CalendarEvent, CalendarEventAction } from './utils/calendar-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MonthCalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-calendar';

  actions: CalendarEventAction[] = [
    {
      isBothIconAndLabel: true,
      icon: 'fa-solid fa-pencil',
      label: 'Edit',
      tooltip: 'Edit Event'
    },
    {
      isBothIconAndLabel: true,
      icon: 'fa-solid fa-trash',
      label: 'Delete',
      tooltip: 'Delete Event'
    }
  ];

  events: CalendarEvent[] = [
    { id: 1, title: 'Meeting with Team', start: new Date(2026, 1, 13), durationInHrs: '02:00', totalDurationInHrs: '23:00', color: 'blue', actions: this.actions },
    { id: 2, title: 'Team Building', start: new Date(), durationInHrs: '04:00', totalDurationInHrs: '23:00', color: 'green', actions: this.actions },
    { id: 3, title: 'Conference Call', start: new Date(), durationInHrs: '01:00', totalDurationInHrs: '23:00', color: 'purple', actions: this.actions },
    { id: 4, title: 'Lunch with Client', start: new Date(), durationInHrs: '02:00', totalDurationInHrs: '23:00', color: 'orange', actions: this.actions },
    { id: 5, title: 'Review Meeting', start: new Date(), durationInHrs: '01:00', totalDurationInHrs: '23:00', color: 'red', actions: this.actions },
    { id: 6, title: 'Project Deadline', start: new Date(), durationInHrs: '03:00', totalDurationInHrs: '23:00', color: 'red', actions: this.actions },
    { id: 12, title: 'Birthday Party', start: new Date(2026, 2, 12), durationInHrs: '04:00', totalDurationInHrs: '04:00', color: 'green', actions: this.actions },
  ];

  onchangeMonthView(date: Date) {
    console.log('Month view changed to:', date);
  }

  addEvent(date: Date) {
    console.log('Adding event for date:', date);
  }

  onEventAction(data: { action: CalendarEventAction, event: CalendarEvent }) {
    switch (data.action.label) {
      case 'Edit':
        this.editEvent(data.event);
        break;
      case 'Delete':
        this.deleteEvent(data.event);
        break;
    }
  }

  editEvent(event: CalendarEvent) {
    console.log('Editing event:', event);
  }

  deleteEvent(event: CalendarEvent) {
    console.log('Deleting event:', event);
  }
}
