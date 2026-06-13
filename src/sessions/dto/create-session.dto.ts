import { IsString, IsNotEmpty, IsNumber, IsISO8601, Min, IsIn } from 'class-validator';

// Your 5 predefined locations
const BANGALORE_LOCATIONS = [
  'Koramangala Sports Complex',
  'Indiranagar Badminton Court',
  'Kanteerava Stadium',
  'HSR Layout Sports Club',
  'Cubbon Park Tennis Academy',
  'Online' // Always good to have a remote fallback
];

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty({ message: 'Class title cannot be empty' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description!: string;

  // --- NEW FIELDS ---
  @IsString()
  @IsNotEmpty({ message: 'Sport is required' })
  sport!: string;

  @IsString()
  @IsIn(BANGALORE_LOCATIONS, { message: 'Must be a valid predefined Bangalore location' })
  location!: string;

  @IsString()
  @IsNotEmpty({ message: 'Time slot is required' })
  timeSlot!: string;
  // ------------------

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsISO8601({}, { message: 'Date must be a valid ISO8601 string' })
  date!: string;

  @IsNumber()
  @Min(1, { message: 'Max slots must be at least 1' })
  maxSlots!: number;
}