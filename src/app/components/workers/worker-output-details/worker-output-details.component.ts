import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Worker } from 'src/app/shared/interfaces/mongo-backend';

@Component({
  selector: 'app-worker-output-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './worker-output-details.component.html',
  styleUrl: './worker-output-details.component.css'
})
export class WorkerOutputDetailsComponent {

  @Input() worker: Worker | undefined;  

}
