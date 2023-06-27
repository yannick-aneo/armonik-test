import { Component, inject, AfterViewInit} from "@angular/core";
import { startWith, switchMap, Subject } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { PartitionRaw, TaskSummary } from "@aneoconsultingfr/armonik.api.angular";
import { PartitionsGrpcService } from "./services/partitions-grpc.service";
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import { TasksGrpcService } from "./services/tasks-grpc.service";
import { TasksListComponent } from "./tasks-list.component";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector:`app-root`,
  template: `

  <header class="header">
    <button mat-button [routerLink]="['/tasks']" routerLinkActive="active">Tasks</button>
    <button mat-button [routerLink]="['/sessions']" routerLinkActive="active">Sessions</button>
    <button mat-button [routerLink]="['/results']" routerLinkActive="active">Results</button>
  </header>
  <ul>
    <li *ngFor="let partition of partitions; trackBy:trackByPartition">
      {{ partition.id }}
    </li>
     <div *ngIf="loading">
         Loading...
     </div>
</ul>
<button (click)="refresh()">Refresh</button>
<router-outlet></router-outlet>




`, 
  styles: [`
     ul {
      list-style-type: none; 
     }

     .active{
      background: indianred;  
      transition: .3s; 
       color: #fff; 
     }
  `], 
  standalone: true, 
  imports: [NgFor, NgIf, RouterLink,RouterModule, RouterLinkActive, RouterOutlet, TasksListComponent, MatButtonModule, MatMenuModule], 
  providers: [PartitionsGrpcService, TasksGrpcService], 
})

export class AppComponent implements AfterViewInit {
  
  #partitionsGrpcService = inject(PartitionsGrpcService); 

  partitions: PartitionRaw.AsObject[] = []
  loading = true;

  #refresh: Subject<void> = new Subject<void>();
  tasksList: TaskSummary.AsObject[] = [] 

  


  ngAfterViewInit(): void { 
   
      this.#refresh.pipe(
        startWith({}), 
         switchMap(() => { 
          this.loading = true; 
          return this.#partitionsGrpcService.list$();
        }),
      )
      .subscribe(
        (response) => {
          console.log(response)
          this.loading = false; // We hide the loading indicator when the call is done.
          if (response.partitions) {
            this.partitions = response.partitions; // We update the partitions list.
          }
        }
      );

  }

  trackByPartition(_index_: number, partition: PartitionRaw.AsObject): string {
    return partition.id;
  }
  
  refresh(): void {
      this.#refresh.next()
  }
  
}