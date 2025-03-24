import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeAgo = (date: Date) => {
  const now = new Date();
  //@ts-ignore
  const diffInMs = now - new Date(date); // Difference in milliseconds
  const diffInSec = Math.floor(diffInMs / 1000); // Convert to seconds
  const diffInMin = Math.floor(diffInSec / 60); // Convert to minutes
  const diffInHours = Math.floor(diffInMin / 60); // Convert to hours
  const diffInDays = Math.floor(diffInHours / 24); // Convert to days
  
  if (diffInSec < 60) {
    return `${diffInSec} seconds ago`;
  } else if (diffInMin < 60) {
    return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else {
    return new Date(date).toString(); // Default to full date string if it's over a month ago
  }
};