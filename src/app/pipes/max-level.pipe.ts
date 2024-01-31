import { Pipe, PipeTransform } from "@angular/core";
import { Trait } from "../lib";

@Pipe({
    standalone: true,
    name: "maxLevel"
})
export class MaxLevelPipe implements PipeTransform {
    transform(levels: Trait["levels"]): string {
        return levels.length.toString(10);
    }
}
