import { Component, output } from '@angular/core'

@Component({
  selector: 'app-bad-output',
  templateUrl: './bad-output.component.html',
})
export class BadOutputComponent {
  readonly onClick = output<void>()
}
