import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionDto } from './create-session.dto';


// Used when updating a session.
export class UpdateSessionDto extends PartialType(CreateSessionDto) {}
