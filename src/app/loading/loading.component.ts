import {Component} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: "loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"],
    imports: [MatProgressSpinner]
})
export class LoadingIndicatorComponent {



}
