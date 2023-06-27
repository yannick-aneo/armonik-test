import { Injectable, inject } from '@angular/core'; 
import { ListTasksRequest, ListTasksResponse, TasksClient, ListPartitionsRequest } from '@aneoconsultingfr/armonik.api.angular'; 
import { Observable } from 'rxjs'; 

@Injectable()
export class TasksGrpcService {
    readonly #tasksClient = inject(TasksClient);
    tasksList$(value=0): Observable<ListTasksResponse> {  
    const page = value      
    const tasksRequest = new ListTasksRequest({
        page,
        pageSize: 10,
        sort: {
        direction: ListPartitionsRequest.OrderDirection.ORDER_DIRECTION_ASC,
        field: ListTasksRequest.OrderByField.ORDER_BY_FIELD_CREATED_AT
    },
    filter:{
        sessionId: '',
        status: []
    }

    });
        return this.#tasksClient.listTasks(tasksRequest);
  }
}