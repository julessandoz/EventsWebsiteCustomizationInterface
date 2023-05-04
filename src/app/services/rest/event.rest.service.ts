import { RegistrationResult } from './../../models/RegistrationResult';
import { HTTP_HELPER } from './../../providers/http.helper.provider';
import { Captcha } from './../../models/Captcha';
import { EventService } from 'src/app/services/event.service';
import { environment } from './../../../environments/environment';
import { FinalizeRegistrationRequest } from './../../models/FinalizeRegistrationRequest';
import { Sponsorship } from '../../models/Sponsorship';
import { Speaker } from '../../models/Speaker';
import { SessionTrack } from '../../models/SessionTrack';
import { Session } from '../../models/Session';
import { Pass } from '../../models/Pass';
import { HttpHelper } from '../../helpers/HttpHelper';
import { Injectable, Inject } from '@angular/core';
import { Event } from '../../models/Event';
import { Observable } from 'rxjs';
import { RegistrationData } from '../../models/RegistrationData';
import * as CustomRegistrationFieldModel from '../../models/CustomRegistrationField';

@Injectable()
export class EventRestService implements EventService {
    private static readonly eventsEndpoint: string = 'events';

    constructor(@Inject(HTTP_HELPER) private http: HttpHelper) {
    }

    public getPublishedEvents(): Observable<Event[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<Event[]>(`assets/mocks/api/responses/api/events/published`);
        }
        return this.http.get<Event[]>(`${environment.apiEndpoint}${EventRestService.eventsEndpoint}/published`);
    }

    public getEvent(readableEventId: string): Observable<Event> {
        return this.http.get<Event>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}`
        );
    }

    public getPasses(readableEventId: string): Observable<Pass[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<Pass[]>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/passes`
            )
        }
        return this.http.get<Pass[]>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/passes`
        );
    }

    public getSessions(readableEventId: string): Observable<Session[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<Session[]>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/sessions`
            )
        }
        return this.http.get<Session[]>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/sessions`
        );
    }

    public getSessionTracks(readableEventId: string): Observable<SessionTrack[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<SessionTrack[]>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/tracks`
            )
        }
        return this.http.get<SessionTrack[]>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/tracks`
        );
    }

    public getSpeakers(readableEventId: string): Observable<Speaker[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<Speaker[]>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/speakers`
            )
        }
        return this.http.get<Speaker[]>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/speakers`
        );
    }

    public getSponsors(readableEventId: string): Observable<Sponsorship[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<Sponsorship[]>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/sponsors`
            )
        }
        return this.http.get<Sponsorship[]>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/sponsorships`
        );
    }

    getCaptcha(readableEventId: string): Observable<Captcha> {
        return this.http.get<Captcha>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/captcha`
        );
    }

    public getCustomRegistrationFields(readableEventId: string): Observable<CustomRegistrationFieldModel.CustomRegistrationField[]> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<CustomRegistrationFieldModel.CustomRegistrationField[]>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/custom-registration-fields`
            )
        }
        const url = `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/custom-registration-fields`;
        return this.http.get<CustomRegistrationFieldModel.CustomRegistrationField[]>(url);
    }

    public getEventRegistrationCount(readableEventId: string): Observable<number> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.get<number>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/registrations/count`
            )
        }
        return this.http.get<number>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/registrations/count`
        );
    }

    public registerToEvent(readableEventId: string, registrationData: RegistrationData): Observable<RegistrationResult> {
        if (environment.useMockData) {
            // load event data from mock data file
            return this.http.post<RegistrationResult>(
                `assets/mocks/api/responses/api/events/event/${readableEventId}/registrations`,
                registrationData
            )
        }
        const url = `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/registrations`;
        return this.http.post<RegistrationResult>(url, registrationData, true);
    }

    public finalizeRegistration(readableEventId: string, requestData: FinalizeRegistrationRequest): Observable<RegistrationResult> {
        const url = `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/registrations/finalize`;
        return this.http.post<RegistrationResult>(url, requestData, true);
    }

    public registerToSession(readableEventId: string, sessionId: string): Observable<boolean> {
        return this.http.post<boolean>(
            `${environment.apiEndpoint}${EventRestService.eventsEndpoint}/${readableEventId}/sessions/${sessionId}/registrations`, {}, true
        );
    }
}
