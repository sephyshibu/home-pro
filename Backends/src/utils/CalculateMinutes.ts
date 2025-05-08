import { WorkTime } from "../domain/models/Bookings";

export function calculateTotalWorkMinutes(workTime: WorkTime[] = []): number {
    return workTime.reduce((total, session) => {
      if (session.start && session.end) {
        const durationMs = new Date(session.end).getTime() - new Date(session.start).getTime();
        if (durationMs > 0) {
          total += Math.floor(durationMs / 60000); // Convert ms to minutes
        }
      }
      return total;
    }, 0);
  }