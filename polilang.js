var polilang = {
    version: "0.1-Beta",
    settings: {
        appVersion: "1.0",
        supportedLocalization: [],
        defaultLocalization: "",
        resource:{}
    },
    elements: {},
    init: function (supportedLocalization, defaultLocalization, appVersion, resource) {
        polilang.settings.supportedLocalization = supportedLocalization;
        polilang.settings.defaultLocalization = defaultLocalization;
        polilang.settings.appVersion = appVersion;
        polilang.settings.resource = resource;
        //check and set the default localizaton
        var localization = locache.get(polilang.settings.appVersion + "-localization");
        if (localization == null) {
            var browserLocalization = window.navigator.userLanguage || window.navigator.language;
            localization = $.inArray(browserLocalization, polilang.settings.supportedLocalization) == -1 ? polilang.settings.defaultLocalization : browserLocalization;
        }
        //get the elements
        $('body *').each(function () {
            var ID = $(this).attr('id');
            if (ID != undefined) {
                polilang.elements[ID] = $(this);
            }
        });
        polilang.set(localization);
        return localization;
    },
    get: function () {
        var localization = locache.get(polilang.settings.appVersion + "-localization");
        if (localization == null) {
            localization = polilang.init(['en-US'], 'en-US', '1.0');
        }
        return localization;
    },
    set: function (localization) {
        if ($.inArray(localization, polilang.settings.supportedLocalization) == -1) {
            return false;
        }
        else {
            locache.set(polilang.settings.appVersion + "-localization", localization);
            if (polilang.settings.resource != undefined && polilang.elements != undefined) {
                polilang.render(polilang.settings.resource, polilang.elements);
            }

            return true;
        }
    },
    render: function (resource, model) {
        var localization = locache.get(polilang.settings.appVersion + "-localization");
        $.each(model, function (i, item) {
            if (resource[i] != undefined && resource[i][localization] != undefined) {
                item.html(resource[i][localization]);
            }
        });
    }
};
