import { ListSessionsRequest, ListSessionsResponse, SessionStatus, SessionsClient } from '@aneoconsultingfr/armonik.api.angular';
import { Injectable, inject } from '@angular/core'; 
import { Observable } from 'rxjs';

@Injectable()
export class SessionsGrpcService {
    readonly #sessionsClient = inject(SessionsClient);

    sessionsList$(): Observable<ListSessionsResponse> {     
    const sessions = new ListSessionsRequest({
        page: 0,
        pageSize: 1,
        sort: {
        direction: ListSessionsRequest.OrderDirection.ORDER_DIRECTION_ASC,
        field: ListSessionsRequest.OrderByField.ORDER_BY_FIELD_STATUS
       }, 
       filter : { 
        applicationName: '', 
        applicationVersion: '', 
        sessionId : '', 
        status: SessionStatus.SESSION_STATUS_UNSPECIFIED
       }
    });
        return this.#sessionsClient.listSessions(sessions)
}
}