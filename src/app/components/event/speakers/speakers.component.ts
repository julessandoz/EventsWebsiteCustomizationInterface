import { EVENT_SERVICE } from "./../../../providers/service.providers";
import { EventService } from "../../../services/event.service";
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    Inject,
    ElementRef,
    OnDestroy
} from "@angular/core";
import { Speaker } from "../../../models/Speaker";
import { ImageHelper } from "../../../helpers/ImageHelper";
import { ScrollHelper } from "src/app/helpers/ScrollHelper";
import { ActivatedRoute } from "@angular/router";
import { EventQueryParameterNames } from '../event.component';
import { LocalizableError } from 'src/app/models/LocalizableError';
import { EventRouterService } from 'src/app/services/event-router.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: "app-speakers",
    templateUrl: "./speakers.component.html",
    styleUrls: ["./speakers.component.scss"]
})
export class SpeakersComponent implements OnInit, OnDestroy {
    @Input()
    readableEventId: string;

    @ViewChild("speakerDetails", { static: true })
    speakerDetailsContainer: ElementRef;

    public speakers: Speaker[];
    public speaker: Speaker;
    public isLoading = false;
    public error: LocalizableError;

    private eventRouterSubscription: Subscription;
    
    defaultImageUrl = "default_contact_image.png";

    constructor(
        private route: ActivatedRoute,
        private imageHelper: ImageHelper,
        @Inject(EVENT_SERVICE) private eventService: EventService,
        private eventRouterService: EventRouterService,
        private httpClient: HttpClient
    ) { }
    ngOnDestroy(): void {
        this.eventRouterSubscription.unsubscribe();
    }

    ngOnInit() {
        this.eventRouterSubscription = this.eventRouterService.speakers$.subscribe(s => this.handleSpeakerLoading(s));
        this.route.queryParamMap.subscribe(paramMap => {
            this.readableEventId = paramMap.get(EventQueryParameterNames.ReadableEventId);

            this.loadSpeakers();
        });
    }

    public selectSpeaker(speaker: Speaker): void {
        this.speaker = speaker;

        if (this.speakerDetailsContainer && this.speakerDetailsContainer.nativeElement) {
            ScrollHelper.scrollToElement(
                this.speakerDetailsContainer.nativeElement
            );
        }
    }

    public selectSpeakerById(speakerId: string) {
        if (speakerId && this.speakers) {
            const speakerToSelect = this.speakers.find(
                speaker => speaker.id === speakerId
            );

            if (speakerToSelect != null) {
                this.selectSpeaker(speakerToSelect);
            }
        }
    }

    private loadSpeakers() {
        this.isLoading = true;

        // check if mock data should be used
        if (environment.useMockData) {
            // load event data from mock data file
            const mockDataUrl = `assets/mocks/api/responses/api/events/event/${this.readableEventId}/speakers/get.json`;
            this.httpClient.get<Speaker[]>(mockDataUrl).subscribe(
                speakers => {
                    this.handleSpeakerLoading(speakers);                    
                    this.isLoading = false;
                },
                (error: LocalizableError) => this.handleErrorResponse(error)
            );
            return;
        }

        if (this.speakers == null) {
            this.eventService.getSpeakers(this.readableEventId).
                subscribe(s => {
                    this.handleSpeakerLoading(s);
                    this.isLoading = false;
                },
                    (error: LocalizableError) => this.handleErrorResponse(error));
        }
    }

    private handleSpeakerLoading(speakers: Speaker[]) {
        this.speakers = speakers;

        if (speakers.length === 0) {
            this.eventRouterService.evaluateRoute();
        }

        this.route.queryParamMap.subscribe(paramMap => {
            const selectedSpeakerId = paramMap.get(EventQueryParameterNames.SpeakerId);
            this.selectSpeakerById(selectedSpeakerId);
        });
    }

    private handleErrorResponse(error: LocalizableError) {
        this.isLoading = false;
        this.error = error;
    }
}
