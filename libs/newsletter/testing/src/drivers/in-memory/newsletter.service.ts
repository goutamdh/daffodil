import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { DaffNewsletterServiceInterface, DaffNewsletterSubmission } from '@daffodil/newsletter';
import { DaffNewsletterUnion } from '@daffodil/newsletter';
import { delay } from 'rxjs/operators';

/**
 * The newsletter inmemory driver to mock the newsletter backend service.
 * 
 * @Param HttpClient
 */
@Injectable({
  providedIn: 'root'
})
export class DaffInMemoryNewsletterService implements DaffNewsletterServiceInterface<DaffNewsletterUnion, DaffNewsletterUnion>{
  constructor() { }

  send(payload: DaffNewsletterUnion): Observable<DaffNewsletterUnion> {
    const wait_time = Math.random() * (1500 - 500) + 500;
    if (payload === undefined || payload.email === 'ThrowError') {
      return throwError('Failed to subscribe');
    }
    return of(payload).pipe(delay(wait_time));
  }
}