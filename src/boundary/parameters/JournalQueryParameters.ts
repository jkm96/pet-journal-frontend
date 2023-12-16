import {RequestParameters} from "@/boundary/parameters/requestParameters";
export class JournalQueryParameters extends RequestParameters {
    public searchTerm: string | undefined;
    public periodFrom?: Date | undefined;
    public periodTo?: Date | undefined;

    constructor() {
        super(10, 1, "createdOn desc");
        this.searchTerm = "";
    }
}
