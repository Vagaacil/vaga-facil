export const CLOCK_PORT = 'CLOCK_PORT';

export interface ClockPort {
  agora(): Date;
}

export class SystemClock implements ClockPort {
  agora(): Date {
    return new Date();
  }
}
