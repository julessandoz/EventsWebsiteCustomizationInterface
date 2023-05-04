import {
    EVENT_SERVICE,
    SPONSORSHIPS_SERVICE
} from './../../../providers/service.providers';
import { EventService } from '../../../services/event.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Sponsorship } from '../../../models/Sponsorship';
import { LocalizableError } from 'src/app/models/LocalizableError';
import { SponsorshipsService } from 'src/app/services/sponsorships.service';
import { ImageHelper } from "src/app/helpers/ImageHelper";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-sponsors',
    templateUrl: './sponsors.component.html',
    styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {
    @Input() readableEventId: string;
    @Input() renderOnZeroSponsorships = true;
    public sponsorships: Sponsorship[];
    public isLoading = false;
    public error: LocalizableError;

    public defaultImageUrl = 'assets/mocks/api/responses/default_sponsor_logo.png';
    constructor(
        private imageHelper: ImageHelper,
        @Inject(EVENT_SERVICE) private eventService: EventService,
        @Inject(SPONSORSHIPS_SERVICE) private sponsorsService: SponsorshipsService,
        private httpClient: HttpClient
    ) {}

    ngOnInit() {
        this.loadSponsors();
    }

    private loadSponsors() {
        this.isLoading = true;

        // check if mock data should be used
        if (environment.useMockData) {
            // load event data from mock data file
            const mockDataUrl = `assets/mocks/api/responses/api/events/event/${this.readableEventId}/sponsors/get.json`;
            this.httpClient.get<Sponsorship[]>(mockDataUrl).subscribe(
                sponsorships => {
                    this.sponsorships = sponsorships;
                    this.setSponsorLogosSrc();
                    
                    this.isLoading = false;
                },
                (error: LocalizableError) => this.handleErrorResponse(error)
            );
            return;
        }

        this.eventService.getSponsors(this.readableEventId).subscribe(
            sponsorships => {
                console.log(42);
                this.sponsorships = sponsorships;
                this.setSponsorLogosSrc();

                this.isLoading = false;
            },
            (error: LocalizableError) => this.handleErrorResponse(error)
        );
    }

    private setSponsorLogosSrc() {
        this.sponsorships.forEach(sponsor => {
            sponsor.logoSrc = this.sponsorsService.getLogoSrc(sponsor);
        });
    }

    private handleErrorResponse(error: LocalizableError) {
        this.isLoading = false;
        this.error = error;
    }
}
