import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';
import { CalendarEvent } from '../utils/calendar-utils';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'month-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month-calendar.component.html',
  styleUrl: './month-calendar.component.scss',
  animations: [
    trigger('expandCollapse', [
      transition(':enter', [
        style({
          height: 0,
          opacity: 0
        }),
        animate('250ms ease-out', style({
          height: '*',
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate('200ms ease-in', style({
          height: 0,
          opacity: 0
        }))
      ])
    ])
  ]
})
export class MonthCalendarComponent {

  @Input() previousMonthBtnLabel: string = '◀';
  @Input() nextMonthBtnLabel: string = '▶';
  @Input() badgeLabel: string = '';
  // @Input() events: CalendarEvent[] = [];

  @Input() set events(value: CalendarEvent[]) {
    this._events.set(value ?? []);
  }

  get events() {
    return this._events();
  }

  private _events = signal<CalendarEvent[]>([]);
  totalDurationLabel: string = 'Total: ';
  dayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDate = signal(new Date());
  selectedDate = signal<Date | null>(new Date());
  private touchTimer: any;

  @Output() doubleClickOnCell = new EventEmitter<Date>();
  @Output() eventAction = new EventEmitter<{ action: any, event: CalendarEvent }>();
  @Output() changeMonthView = new EventEmitter<Date>();

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

  trackByWeek = (index: number) => index;
  trackByDay = (_: number, day: Date) => day.toDateString();
  trackByEvent = (_: number, event: CalendarEvent) => event.id;

  previousMonth() {
    const date = new Date(this.currentDate());
    date.setMonth(date.getMonth() - 1);
    this.currentDate.set(date);
    this.selectedDate.set(null);
    this.changeMonthView.emit(date);
  }

  nextMonth() {
    const date = new Date(this.currentDate());
    date.setMonth(date.getMonth() + 1);
    this.currentDate.set(date);
    this.selectedDate.set(null);
    this.changeMonthView.emit(date);
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
    return events[0]?.totalDurationInHrs ?? ''; // Assuming all events on the same day have the same totalDuration
  }

  // eventsMap = computed(() => {
  //   const map = new Map<string, CalendarEvent[]>();

  //   for (const event of this.events) {
  //     const key = event.start.toDateString();

  //     if (!map.has(key)) {
  //       map.set(key, []);
  //     }

  //     map.get(key)!.push(event);
  //   }

  //   return map;
  // });


  getEventsForDate(date: Date): CalendarEvent[] {
    if (!date) return [];
    return this.events.filter(event =>
      event.start.toDateString() === date.toDateString()
    );

    // return this.eventsMap().get(date.toDateString()) ?? [];
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
    // this.addEvent(date);
    this.selectedDate.set(date);
    this.doubleClickOnCell.emit(date);
  }

  onTouchStart(date: Date) {
    if (!this.isCurrentMonth(date)) return;

    this.touchTimer = setTimeout(() => {
      // this.addEvent(date);
      this.selectedDate.set(date);
      this.doubleClickOnCell.emit(date);
    }, 500); // 500ms long press
  }

  onTouchEnd() {
    clearTimeout(this.touchTimer);
  }

  handleEventAction(action: any, event: CalendarEvent) {
    this.eventAction.emit({ action, event });
  }

  // addEvent(date: Date) {
  //   console.log('Adding event for date:', date);
  // }

  // editEvent(event: CalendarEvent) {
  //   console.log('Editing event:', event);
  // }

  // deleteEvent(event: CalendarEvent) {
  //   console.log('Deleting event:', event);
  // }



}
