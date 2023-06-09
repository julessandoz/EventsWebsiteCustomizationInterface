/**
 * Default format used when environment configuration is missing
 */
export const DefaultDateFormats = {
  singleDateFormat: "dd/MM/yy", // used for diplaying single date. Example: 08/20/2020.
  rangeDateFormat: "dd/MM/yy", // used for displaying date in a range such as [startDate] - [endDate].
  timeFormat: "HH:mm", // used for displaying time. Example : 9:20 AM
  timezoneFormat: "zzz",
  convertToLocalDate: false, // if set to true will convert all dates to end users local date
  
  /**
   * Formatting template for a single date.
   * The structure will use the configurations from : 
   *  - [date] -> singleDateFormat, 
   *  - [time] -> timeFormat 
   *  - [z] -> timezoneFormat
   * Example 04/07/23, 08:05
   */
  singleDateStructure: "[date], [time]",


  /**
   * Formatting template for a date range
   * The structure will use the configurations from : 
   *  - [date] -> rangeDateFormat, 
   *  - [startTime], [endTime] -> timeFormat 
   *  - [z] -> timezoneFormat
   * Example :
   * 04/07/23 - 05/07/2023 if startDate and endDate are on diffrent days
   * 04/07/23 08:05 - 22:00 if startDate and endDate are on the same days
   */
  rangeTimeStructure: "[date] [startTime] - [endTime]", // template for time range across multiple hours for a single day
  rangeDateStructure: "[startDate] - [endDate]",  // template for date range across multiple days
}