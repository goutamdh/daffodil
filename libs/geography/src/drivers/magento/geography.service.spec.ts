import { TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { of } from 'rxjs';

import {
  DaffCountry,
  DaffSubdivision
} from '@daffodil/geography';
import {
  DaffCountryFactory,
  DaffSubdivisionFactory
} from '@daffodil/geography/testing';

import { DaffGeographyMagentoService } from './geography.service';
import { DaffMagentoCountryTransformer } from './transforms/responses/country.service';
import { getCountries, MagentoGetCountriesResponse } from './queries/public_api';
import { MagentoRegion, MagentoCountry } from './models/responses/public_api';
import { getCountry } from './queries/get-country';
import { MagentoGetCountryResponse } from './queries/responses/get-country';

describe('Driver | Magento | Geography | GeographyService', () => {
  let service: DaffGeographyMagentoService;
  let controller: ApolloTestingController;

  let daffCountryFactory: DaffCountryFactory;
  let daffSubdivisionFactory: DaffSubdivisionFactory;

  let countryTransformerSpy: jasmine.SpyObj<DaffMagentoCountryTransformer>;

  let countryId: DaffCountry['id'];
  let mockDaffCountry: DaffCountry;
  let mockDaffSubdivision: DaffSubdivision;
  let mockMagentoRegion: MagentoRegion;
  let mockMagentoCountry: MagentoCountry;
  let mockGetCountriesResponse: MagentoGetCountriesResponse;
  let mockGetCountryResponse: MagentoGetCountryResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule
      ],
      providers: [
        DaffGeographyMagentoService,
        {
          provide: DaffMagentoCountryTransformer,
          useValue: jasmine.createSpyObj('DaffMagentoCountryTransformer', ['transform'])
        }
      ]
    });

    service = TestBed.get(DaffGeographyMagentoService);
    controller = TestBed.get(ApolloTestingController);

    daffSubdivisionFactory = TestBed.get(DaffSubdivisionFactory);
    daffCountryFactory = TestBed.get(DaffCountryFactory);

    countryTransformerSpy = TestBed.get(DaffMagentoCountryTransformer);

    mockDaffCountry = daffCountryFactory.create();
    mockDaffSubdivision = daffSubdivisionFactory.create();

    countryId = mockDaffCountry.id;
    mockMagentoRegion = {
      id: Number(mockDaffSubdivision.id),
      name: mockDaffSubdivision.name,
      code: mockDaffSubdivision.iso_3166_2
    };
    mockMagentoCountry = {
      id: mockDaffCountry.id,
      two_letter_abbreviation: mockDaffCountry.alpha2,
      three_letter_abbreviation: mockDaffCountry.alpha3,
      full_name_english: mockDaffCountry.name_en,
      full_name_locale: mockDaffCountry.name,
    };
    mockGetCountriesResponse = {
      countries: [mockMagentoCountry]
    };
    mockGetCountryResponse = {
      country: mockMagentoCountry
    };

    countryTransformerSpy.transform.and.returnValue(mockDaffCountry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get | getting a single country by ID', () => {
    beforeEach(() => {
      mockDaffCountry.subdivisions = [mockDaffSubdivision];
      mockMagentoCountry.available_regions = [mockMagentoRegion];
    });

    it('should call the transformer with the correct argument', done => {
      service.get(countryId).subscribe(() => {
        expect(countryTransformerSpy.transform).toHaveBeenCalledWith(mockMagentoCountry);
        done();
      });

      const op = controller.expectOne(getCountry);

      op.flush({
        data: mockGetCountryResponse
      });
    });

    it('should return the correct country', done => {
      service.get(countryId).subscribe(result => {
        expect(result).toEqual(jasmine.objectContaining(mockDaffCountry));
        done();
      });

      const op = controller.expectOne(getCountry);

      op.flush({
        data: mockGetCountryResponse
      });
    });
  });

  describe('list | list the available countries', () => {
    it('should call the transformer with the correct argument', done => {
      service.list().subscribe(() => {
        expect(countryTransformerSpy.transform).toHaveBeenCalledWith(mockMagentoCountry);
        done();
      });

      const op = controller.expectOne(getCountries);

      op.flush({
        data: mockGetCountriesResponse
      });
    });

    it('should return the correct value', done => {
      service.list().subscribe(result => {
        expect(result).toEqual([jasmine.objectContaining(mockDaffCountry)]);
        done();
      });

      const op = controller.expectOne(getCountries);

      op.flush({
        data: mockGetCountriesResponse
      });
    });

    describe('when the response is empty', () => {
      it('should return an empty array', done => {
        service.list().subscribe(result => {
          expect(result).toEqual([]);
          done();
        });

        const op = controller.expectOne(getCountries);

        op.flush({
          data: {
            countries: null
          }
        });
      });
    });

    afterEach(() => {
      controller.verify();
    });
  });
});
