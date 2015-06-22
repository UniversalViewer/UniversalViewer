require.config({
    paths: {
        'browserdetect': 'lib/browserdetect',
        'ext': 'lib/extensions',
        'jquery': 'lib/jquery-1.10.2.min',
        'jsviews': 'lib/jsviews.min',
        'l10n': 'lib/l10n',
        'length': 'lib/Length.min',
        'modernizr': 'lib/modernizr',
        'plugins': 'lib/jquery.plugins',
        'pubsub': 'lib/pubsub',
        'sanitize': 'lib/sanitize',
        'underscore': 'lib/underscore-min',
        'utils': 'lib/utils',
        'yepnope': 'lib/yepnope.1.5.4-min',
        'yepnopecss': 'lib/yepnope.css'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        jsviews: {
            deps: ['jquery']
        },
        plugins: {
            deps: ['jquery']
        },
        pubsub: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        yepnopecss: {
            deps: ['yepnope']
        }
    }
});

require([
        'Bootstrapper',
        'browserdetect',
        'ext',
        'extensions/uv-mediaelement-extension/Extension',
        'extensions/uv-mediaelement-extension/Provider',
        'extensions/uv-pdf-extension/Extension',
        'extensions/uv-pdf-extension/Provider',
        'extensions/uv-seadragon-extension/Extension',
        'extensions/uv-seadragon-extension/Provider',
        'jquery',
        'jsviews',
        'l10n',
        'length',
        'modernizr',
        'plugins',
        'pubsub',
        'sanitize',
        'underscore',
        'utils',
        'yepnope',
        'yepnopecss',
    ], (
        bootstrapper,
        browserdetect,
        ext,
        mediaelementExtension,
        mediaelementProvider,
        pdfExtension,
        pdfProvider,
        seadragonExtension,
        seadragonProvider
    ) => {

        // todo: use a compiler flag (when available)
        window.DEBUG = true; // this line is removed on build.

        var extensions = {};

        extensions['seadragon/iiif'] = {
            type: seadragonExtension,
            provider: seadragonProvider,
            name: 'uv-seadragon-extension'
        };

        extensions['video/iiif'] = {
            type: mediaelementExtension,
            provider: mediaelementProvider,
            name: 'uv-mediaelement-extension'
        };

        extensions['audio/iiif'] = {
            type: mediaelementExtension,
            provider: mediaelementProvider,
            name: 'uv-mediaelement-extension'
        };

        extensions['pdf/iiif'] = {
            type: pdfExtension,
            provider: pdfProvider,
            name: 'uv-pdf-extension'
        };

        var bs = new bootstrapper(extensions);

        bs.bootStrap();
    });