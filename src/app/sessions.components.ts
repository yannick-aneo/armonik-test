import { AfterViewInit, Component, inject } from "@angular/core";
import { SessionsGrpcService } from "./services/sessions-grpc.service";
import { Subject, startWith, switchMap } from "rxjs";
import { SessionSummary } from "@aneoconsultingfr/armonik.api.angular/lib/generated/sessions-common.pb";
import { NgFor } from "@angular/common";
import { MatListModule } from "@angular/material/list";






@Component({
    selector: `app-sessions`, 
    template: `
        <mat-list role="list">
                <mat-list-item role="listitem" *ngFor="let sessions of sessionsList">{{ sessions.sessionId }}</mat-list-item>
        </mat-list>
    `, 
    styles: [`
    `], 
    standalone: true,
    providers: [ SessionsGrpcService], 
    imports: [NgFor, MatListModule]
})
export class SessionsComponent implements AfterViewInit{

   #sessionsGrpcService = inject(SessionsGrpcService); 
   #displaySessions : Subject<void> = new Subject<void>();
   sessionsList: SessionSummary.AsObject[] = []; 
   
   
   ngAfterViewInit(): void {
    this.#displaySessions.pipe(
        startWith({}),
        switchMap(() => { 
          return this.#sessionsGrpcService.sessionsList$()
        }),
      )
      .subscribe(
        (response) => {
         console.log(response)
          
          if (response.sessions) {
            this.sessionsList = response.sessions;
          }
        }
      );
   }
}