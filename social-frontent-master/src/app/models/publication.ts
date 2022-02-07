export class Publication {
    constructor(
        public _id: string,
        public text: string,
        public file: any,
        public created_at: string,
        public user: string
    ) {}
}
