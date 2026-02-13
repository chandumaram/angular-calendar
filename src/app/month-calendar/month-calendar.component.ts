import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

export interface CalendarEvent {
  id: number;
  title: string;
  taskDuration: string;
  totalDuration: string;
  date: Date;
  color?: string;
}

@Component({
  selector: 'month-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-calendar.component.html',
  styleUrl: './month-calendar.component.scss'
})
export class MonthCalendarComponent {

  private eventIdCounter = 1;
  dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDate = signal(new Date());
  selectedDate = signal<Date | null>(null);
  private touchTimer: any;

  events = signal<CalendarEvent[]>([
    { id: 1, title: 'Meeting with Team', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'blue' },
    { id: 2, title: 'Team Building', date: new Date(), taskDuration: '04:00', totalDuration: '23:00', color: 'green' },
    { id: 3, title: 'Conference Call', date: new Date(), taskDuration: '01:00', totalDuration: '23:00', color: 'purple' },
    { id: 4, title: 'Lunch with Client', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'orange' },
    { id: 5, title: 'Review Meeting', date: new Date(), taskDuration: '01:00', totalDuration: '23:00', color: 'red' },
    { id: 6, title: 'Project Deadline', date: new Date(), taskDuration: '03:00', totalDuration: '23:00', color: 'red' },
    { id: 7, title: 'Meeting with Team 2', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'blue' },
    { id: 8, title: 'Meeting with Team 3', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'blue' },
    { id: 9, title: 'Meeting with Team 4', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'blue' },
    { id: 10, title: 'Meeting with Team 5', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'blue' },
    { id: 11, title: 'Meeting with Team 6', date: new Date(), taskDuration: '02:00', totalDuration: '23:00', color: 'blue' },
    { id: 12, title: 'Birthday Party', date: new Date(2026, 2, 12), taskDuration: '04:00', totalDuration: '04:00', color: 'green' }
  ]);

  monthYear = computed(() => {
    const date = this.currentDate();
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  });

  days = computed(() => this.generateCalendarDays(this.currentDate()));

  private generateCalendarDays(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();

    const startDate = new Date(year, month, 1 - startDay);

    const calendar: Date[] = [];

    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      calendar.push(day);
    }

    return calendar;
  }

  weeks = computed(() => {
    const days = this.days();
    const weeks: Date[][] = [];

    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  });

  previousMonth() {
    const date = new Date(this.currentDate());
    date.setMonth(date.getMonth() - 1);
    this.currentDate.set(date);
    console.log('Current Date:', this.currentDate());
    this.selectedDate.set(null);
  }

  nextMonth() {
    const date = new Date(this.currentDate());
    date.setMonth(date.getMonth() + 1);
    this.currentDate.set(date);
    console.log('Current Date:', this.currentDate());
    this.selectedDate.set(null);
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate().getMonth();
  }

  getTotalDuration(date: Date): string {
    const events = this.getEventsForDate(date);
    return events[0].totalDuration; // Assuming all events on the same day have the same totalDuration
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    if (!date) return [];
    return this.events().filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  }

  getEventCount(date: Date): number {
    return this.getEventsForDate(date).length;
  }

  toggleEvents(date: Date) {
    if (this.selectedDate()?.toDateString() === date.toDateString()) {
      this.selectedDate.set(null);
    } else {
      this.selectedDate.set(date);
    }
  }

  isSelectedWeek(week: Date[]): boolean {
    return week.some(day => this.selectedDate()?.toDateString() === day.toDateString());
  }

  onDoubleClick(date: Date) {
    if (!this.isCurrentMonth(date)) return;
    this.addEvent(date);
  }

  onTouchStart(date: Date) {
    if (!this.isCurrentMonth(date)) return;

    this.touchTimer = setTimeout(() => {
      this.addEvent(date);
    }, 500); // 500ms long press
  }

  onTouchEnd() {
    clearTimeout(this.touchTimer);
  }

  addEvent(date: Date) {
    console.log('Adding event for date:', date);
    const title = prompt('Enter event title:');
    if (!title) return;

    const newEvent: CalendarEvent = {
      id: ++this.eventIdCounter,
      title,
      taskDuration: "02:00",
      totalDuration: "23:00",
      date,
      color: 'purple'
    };

    this.events.update(events => [...events, newEvent]);
  }

  editEvent(event: CalendarEvent) {
    const newTitle = prompt('Edit event title:', event.title);
    if (!newTitle) return;

    this.events.update(events =>
      events.map(e =>
        e.id === event.id ? { ...e, title: newTitle } : e
      )
    );
  }

  deleteEvent(event: CalendarEvent) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    this.events.update(events => events.filter(e => e.id !== event.id));
  }

}
