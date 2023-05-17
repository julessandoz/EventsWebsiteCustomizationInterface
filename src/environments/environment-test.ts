export const environment = {
    production: false,
    apiUrl: '',
    apiEndpoint: '',
    localizationEndpoint: 'localization/',
    imagesEndpoint: '/',
    useRestStack: true,
    emApplicationtoken: '',
    isAuthenticationEnabled: false,
    buildVersion: require('../../package.json').version,
    defaultLanguage: 'en',
    useAadB2C: false,
    aadB2CConfig: {
        tenant: 'your-tenant.onmicrosoft.com',
        clientID: 'your-client-id',
        signUpSignInPolicy: 'your-sign-up-sign-in-policy',
        b2cScopes: ['your-b2c-scopes'],
        authorityHost: 'https://login.microsoftonline.com/tfp',
        redirectUri: 'http://localhost:4200',
    },
    useMockData: true,
    dateSettings: {
        dateFormat: 'DD.MM.YYYY',
        singleDateFormat: 'dd.MM.yy',
        rangeDateFormat: 'dd.MM.yy',
        timeFormat: 'HH:mm',
        timezoneFormat: 'zzz',
        convertToLocalDate: false,
        singleDateStructure: "[date], [time] [z]",
        rangeTimeStructure: "[date] [startTime] - [endTime] [z]",
        rangeDateStructure: "[startDate] [startTime] - [endDate] [endTime] [z]",
    },

    languageSettings: {
        defaultLanguage: 'en',
        supportedLanguages: [
            {
                code: 'en',
                name: 'English'
            }
        ],
        showLanguageDropdown: false,
        websiteLanguageLcid: '1033',
        useBrowserLanguage: false,
        forceSingleLanguage: false,
    },

};