import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Fish } from './fish';
import { Statistics } from './statistics';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = '/api/';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(private http: HttpClient) { }

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	getFish(): Observable<Fish[]> {
		return this.http.get<Fish[]>(`${apiUrl}`)
			.pipe(
				tap(fish => console.log('fetched fish')),
				catchError(this.handleError('getFish', []))
			);
	}

	getFishById(id: string): Observable<Fish> {
		const url = `${apiUrl}/${id}`;
		return this.http.get<Fish>(url).pipe(
			tap(_ => console.log(`fetched fish id=${id}`)),
			catchError(this.handleError<Fish>(`getFishById id=${id}`))
		);
	}

	addFish(fish: Fish): Observable<Fish> {
		return this.http.post<Fish>(apiUrl, fish, httpOptions).pipe(
			tap((f: Fish) => console.log(`added fish w/ id=${f._id}`)),
			catchError(this.handleError<Fish>(`addFish`))
		)
	}

	updateFish(id: string, fish: Fish): Observable<any> {
		const url = `${apiUrl}/${id}`;
		return this.http.put(url, fish, httpOptions).pipe(
			tap(_ => console.log(`updated fish w id ${id}`)),
			catchError(this.handleError<any>('updateFish'))
		)
	}

	deleteFish(id: string): Observable<Fish> {
		const url = `${apiUrl}/${id}`;
		return this.http.delete<Fish>(url, httpOptions).pipe(
			tap(_ => console.log(`deleted fish by id ${id}`)),
			catchError(this.handleError<Fish>('deleteFish'))
		)
	}

	getStatistics(status: string): Observable<Statistics> {
		const url = `${apiUrl}/daily/${status}`;
		return this.http.get<Statistics>(url).pipe(
			tap(_ => console.log(`fetched statistics w status ${status}`)),
			catchError(this.handleError<Statistics>('getStatistics'))
		)
	}
}
