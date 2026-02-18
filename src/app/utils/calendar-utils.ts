export enum CALENDAR_DAYS_OF_WEEK {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
}

export interface CalendarEvent {
    id: string | number; // maintain it will be unique 
    start: Date;
    end?: Date;
    title: string;
    durationInHrs?: string;
    totalDurationInHrs?: string;
    color?: string;
    allDay?: boolean;
    actions?: CalendarEventAction[];
}

export interface CalendarEventAction {
    isBothIconAndLabel: boolean; // if true, both icon and label will be shown. If false, only icon will be shown
    icon?: string; // supports only fa-icons for now
    label: string; // used if isIcon is not provided
    tooltip?: string; // shown on hover, supports both icon and label
}