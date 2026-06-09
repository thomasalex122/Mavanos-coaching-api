//the DTO describes what data is expected.

export class CreateSessionDto {

    // ! = It tells TypeScript: "I promise this will get a value when the user submits the form. Stop worrying."


    title!: string;
    date!: string;
    maxSlots! :  number;
}
