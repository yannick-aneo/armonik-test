import { ListResultsResponse, ListResultsRequest, ResultsClient, ResultStatus } from '@aneoconsultingfr/armonik.api.angular';
import { Injectable, inject } from '@angular/core'; 
import { Observable } from 'rxjs';

@Injectable()
export class ResultsGrpcService {
    readonly #resultsClient = inject(ResultsClient);

    resultsList$(): Observable<ListResultsResponse> {     
    const results = new ListResultsRequest({
        page: 0,
        pageSize: 3,
        filter: {
            sessionId: '',
            name: '', 
            ownerTaskId: '', 
            status: ResultStatus.RESULT_STATUS_UNSPECIFIED     
        }


    });
        return this.#resultsClient.listResults(results)
}
}