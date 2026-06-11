import { IsString, IsNotEmpty, IsNumber, IsISO8601, Min } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty({ message: 'Class title cannot be empty' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description!: string;

  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price!: number;

  @IsISO8601({}, { message: 'Date must be a valid ISO8601 string' })
  date!: string;

  @IsNumber()
  @Min(1, { message: 'Max slots must be at least 1' })
  maxSlots!: number;
}