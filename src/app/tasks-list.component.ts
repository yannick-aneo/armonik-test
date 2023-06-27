import { Component, inject, AfterViewInit } from "@angular/core";
import { TasksGrpcService,  } from "./services/tasks-grpc.service";
import { NgFor, NgIf } from "@angular/common";
import { TaskSummary } from "@aneoconsultingfr/armonik.api.angular";
import { Subject, startWith, switchMap } from "rxjs";
import {MatListModule} from '@angular/material/list';



@Component({
    selector:`app-tasks-list`,
    template: `<mat-list role="list">
                <mat-list-item role="listitem" *ngFor="let tasks of tasksList">{{ tasks.id}}</mat-list-item>
               </mat-list>
             <button  (click)="previous(page)"> Previous</button>
<button (click)="next(page)"> Next </button>
        `, 
        styles: [`
        ul li {
            list-style-type: none;
        }`], 
        standalone: true, 
        imports: [NgFor, NgIf, MatListModule],
        providers: [TasksGrpcService]

})
export class TasksListComponent implements AfterViewInit {


    #tasksGrpcService = inject(TasksGrpcService); 
    page: number = 0; 
    loading!: boolean
    #displayTasks: Subject<number> = new Subject<number>();
    tasksList: TaskSummary.AsObject[] = []; 
    ngAfterViewInit(): void { 
    
        this.#displayTasks.pipe(
          startWith({}),
          switchMap(() => { 
            this.loading = true; 
            return this.#tasksGrpcService.tasksList$(this.page);
          }),
        )
        .subscribe(
          (response) => {
           console.log(response)
            this.loading = false;
            if (response.tasks) {
              this.tasksList = response.tasks;
            }
          }
        );
    }
    

    displayTasks(pageNumber: number): void {
      this.#displayTasks.next(pageNumber)
  }

    previous(page :number): void {
      this.page = page;
       this.displayTasks(this.page--); 
    }
  
    next(page :number) :void {
      this.page = page
      this.displayTasks(this.page++); 
    }


}