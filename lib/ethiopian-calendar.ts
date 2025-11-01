import type { EthiopianDate } from '@/types'

// Ethiopian months
const ethiopianMonths = [
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
  'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagumen'
]

// Ethiopian holidays (dates in Ethiopian calendar)
export const ethiopianHolidays = [
  { month: 1, day: 1, name: 'Enkutatash (New Year)' },
  { month: 1, day: 17, name: 'Meskel' },
  { month: 4, day: 29, name: 'Genna (Christmas)' },
  { month: 5, day: 11, name: 'Timkat (Epiphany)' },
  { month: 8, day: 23, name: 'Fasika (Easter)' }, // Variable date
]

// Convert Gregorian date to Ethiopian date
export function gregorianToEthiopian(date: Date): EthiopianDate {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  // Simplified conversion (approximate)
  let ethiopianYear = year - 8
  let ethiopianMonth = month + 4
  let ethiopianDay = day
  
  if (ethiopianMonth > 13) {
    ethiopianMonth -= 13
    ethiopianYear += 1
  }
  
  return {
    year: ethiopianYear,
    month: ethiopianMonth,
    day: ethiopianDay,
    monthName: ethiopianMonths[ethiopianMonth - 1] || ''
  }
}

// Convert Ethiopian date to Gregorian date
export function ethiopianToGregorian(ethDate: EthiopianDate): Date {
  // Simplified conversion (approximate)
  let gregorianYear = ethDate.year + 8
  let gregorianMonth = ethDate.month - 4
  
  if (gregorianMonth < 1) {
    gregorianMonth += 13
    gregorianYear -= 1
  }
  
  return new Date(gregorianYear, gregorianMonth - 1, ethDate.day)
}

// Check if a date is an Ethiopian holiday
export function isEthiopianHoliday(date: Date): string | null {
  const ethDate = gregorianToEthiopian(date)
  
  const holiday = ethiopianHolidays.find(h => 
    h.month === ethDate.month && h.day === ethDate.day
  )
  
  return holiday ? holiday.name : null
}

// Format Ethiopian date
export function formatEthiopianDate(ethDate: EthiopianDate): string {
  return `${ethDate.day} ${ethDate.monthName} ${ethDate.year}`
}

// Get Ethiopian calendar month days
export function getEthiopianMonthDays(month: number, year: number): number {
  if (month === 13) {
    // Pagumen has 5 or 6 days
    return isEthiopianLeapYear(year) ? 6 : 5
  }
  return 30 // All other months have 30 days
}

// Check if Ethiopian year is leap year
export function isEthiopianLeapYear(year: number): boolean {
  return (year % 4 === 3)
}

// Get current Ethiopian date
export function getCurrentEthiopianDate(): EthiopianDate {
  return gregorianToEthiopian(new Date())
}