import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Client } from 'src/app/shared/interfaces/mongo-backend';

@Component({
  selector: 'app-client-output-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-output-details.component.html',
  styleUrl: './client-output-details.component.css'
})
export class ClientOutputDetailsComponent {

  @Input() client: Client | undefined;  

}
