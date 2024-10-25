export interface Timestamp {
  timestampID: number
  timestampName: string
  phase: string
}

export interface SemesterTimestamp extends Timestamp {
  startDate: string
  endDate: string
}
