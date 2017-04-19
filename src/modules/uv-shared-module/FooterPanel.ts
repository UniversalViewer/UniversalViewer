import BaseCommands = require("./BaseCommands");
import BaseView = require("./BaseView");
import {MetricType} from "./MetricType";

class FooterPanel extends BaseView {

    $feedbackButton: JQuery;
    $bookmarkButton: JQuery;
    $downloadButton: JQuery;
    $moreInfoButton: JQuery;
    $shareButton: JQuery;
    $embedButton: JQuery;
    $openButton: JQuery;
    $fullScreenBtn: JQuery;
    $logoButton: JQuery;
    $logoImageWidth: number;
    $options: JQuery;

    constructor($element: JQuery) {
        super($element);
    }

    create(): void {
        this.setConfig('footerPanel');

        super.create();

        const that = this;

        $.subscribe(BaseCommands.TOGGLE_FULLSCREEN, () => {
            this.updateFullScreenButton();
        });

        $.subscribe(BaseCommands.METRIC_CHANGED, () => {
            this.updateLogoButton();
            this.updateMinimisedButtons();
            this.updateMoreInfoButton();
        });

        $.subscribe(BaseCommands.SETTINGS_CHANGED, () => {
            this.updateDownloadButton();
        });

        this.$options = $('<div class="options"></div>');
        this.$element.append(this.$options);

        this.$feedbackButton = $('<a class="feedback" title="' + this.content.feedback + '" tabindex="0">' + this.content.feedback + '</a>');
        this.$options.prepend(this.$feedbackButton);

        this.$openButton = $('<a class="open" title="' + this.content.open + '" tabindex="0">' + this.content.open + '</a>');
        this.$options.prepend(this.$openButton);

        this.$bookmarkButton = $('<a class="bookmark" title="' + this.content.bookmark + '" tabindex="0">' + this.content.bookmark + '</a>');
        this.$options.prepend(this.$bookmarkButton);

        this.$shareButton = $('<a href="#" class="share" title="' + this.content.share + '" tabindex="0">' + this.content.share + '</a>');
        this.$options.append(this.$shareButton);

        this.$embedButton = $('<a href="#" class="embed" title="' + this.content.embed + '" tabindex="0">' + this.content.embed + '</a>');
        this.$options.append(this.$embedButton);

        this.$downloadButton = $('<a class="download" title="' + this.content.download + '" tabindex="0">' + this.content.download + '</a>');
        this.$options.prepend(this.$downloadButton);

        this.$moreInfoButton = $('<a href="#" class="moreInfo" title="' + this.content.moreInfo + '" tabindex="0">' + this.content.moreInfo + '</a>');
        this.$options.prepend(this.$moreInfoButton);

        this.$logoButton = $('<a href="' + this.options.logoOptions.website + '" class="logo" title="' + this.content.logo + '" tabindex="0">' + this.content.logo + '</a>');

        // Detecting real image width
        var logoImage = new Image();
        logoImage.onload = (() => this.imageReady(logoImage));
        logoImage.src = 'themes/' + this.extension.config.options.theme + '/img/footer_logo.png';

        this.$options.append(this.$logoButton);

        this.$fullScreenBtn = $('<a href="#" class="fullScreen" title="' + this.content.fullScreen + '" tabindex="0">' + this.content.fullScreen + '</a>');
        this.$options.append(this.$fullScreenBtn);

        this.$openButton.onPressed(() => {
            $.publish(BaseCommands.OPEN);
        });

        this.$feedbackButton.onPressed(() => {
            $.publish(BaseCommands.FEEDBACK);
        });

        this.$bookmarkButton.onPressed(() => {
            $.publish(BaseCommands.BOOKMARK);
        });

        this.$shareButton.onPressed(() => {
            $.publish(BaseCommands.SHOW_SHARE_DIALOGUE, [this.$shareButton]);
        });

        this.$embedButton.onPressed(() => {
            $.publish(BaseCommands.SHOW_EMBED_DIALOGUE, [this.$embedButton]);
        });

        this.$downloadButton.onPressed(() => {
            $.publish(BaseCommands.SHOW_DOWNLOAD_DIALOGUE, [this.$downloadButton]);
        });

        this.$moreInfoButton.onPressed(() => {
            $.publish(BaseCommands.SHOW_MOREINFO_DIALOGUE, [this.$moreInfoButton]);
        });

        this.$fullScreenBtn.on('click', (e) => {
            e.preventDefault();
            $.publish(BaseCommands.TOGGLE_FULLSCREEN);
        });

        if (!Utils.Bools.getBool(this.options.embedEnabled, true)){
            this.$embedButton.hide();
        }

        this.updateMoreInfoButton();
        this.updateLogoButton();
        this.updateOpenButton();
        this.updateFeedbackButton();
        this.updateBookmarkButton();
        this.updateEmbedButton();
        this.updateDownloadButton();
        this.updateFullScreenButton();
        this.updateShareButton();
        this.updateMinimisedButtons();
    }

    imageReady(logoImage): void {
        this.$logoButton.css({
            'width': logoImage.width
        });
        this.updateLogoButtonPosition();
    }

    updateMinimisedButtons(): void {
        
        // if configured to always minimise buttons
        if (Utils.Bools.getBool(this.options.minimiseButtons, false)){
            this.$options.addClass('minimiseButtons');
            return;
        }

        // otherwise, check metric
        if (this.extension.metric.toString() === MetricType.MOBILELANDSCAPE.toString()) {
            this.$options.addClass('minimiseButtons');
        } else {
            this.$options.removeClass('minimiseButtons');
        }
    }

    updateLogoButton(): void {
        var configEnabled = Utils.Bools.getBool(this.options.logoEnabled, false);

        if (configEnabled && this.extension.metric.toString() !== MetricType.MOBILELANDSCAPE.toString()){
            this.$logoButton.show();
        } else {
            this.$logoButton.hide();
        }
    }

    updateLogoButtonPosition(): void {
        var center = this.$element.width() / 2;
        // position logo image.
        this.$logoButton.css({
            'left': center - (this.$logoButton.outerWidth() / 2),
            'width': this.$logoImageWidth
        });
    }

    updateMoreInfoButton(): void {
        var configEnabled = Utils.Bools.getBool(this.options.moreInfoEnabled, false);

        if (configEnabled && this.extension.metric.toString() === MetricType.MOBILELANDSCAPE.toString()){
            this.$moreInfoButton.show();
        } else {
            this.$moreInfoButton.hide();
        }
    }

    updateOpenButton(): void {
        var configEnabled = Utils.Bools.getBool(this.options.openEnabled, false);

        if (configEnabled && !this.extension.isHomeDomain){
            this.$openButton.show();
        } else {
            this.$openButton.hide();
        }
    }

    updateFullScreenButton(): void {
        if (!Utils.Bools.getBool(this.options.fullscreenEnabled, true)){
            this.$fullScreenBtn.hide();
        }

        if (this.extension.isLightbox){
            this.$fullScreenBtn.addClass('lightbox');
        }

        if (this.extension.isFullScreen()) {
            this.$fullScreenBtn.swapClass('fullScreen', 'exitFullscreen');
            this.$fullScreenBtn.text(this.content.exitFullScreen);
            this.$fullScreenBtn.attr('title', this.content.exitFullScreen);
        } else {
            this.$fullScreenBtn.swapClass('exitFullscreen', 'fullScreen');
            this.$fullScreenBtn.text(this.content.fullScreen);
            this.$fullScreenBtn.attr('title', this.content.fullScreen);
        }
    }

    updateEmbedButton(): void {
        if (this.extension.helper.isUIEnabled('embed') && Utils.Bools.getBool(this.options.embedEnabled, false)){
            //current jquery version sets display to 'inline' in mobile version, while this should remain hidden (see media query)
            if ( ! $.browser.mobile ){
              this.$embedButton.show();
            }
        } else {
            this.$embedButton.hide();
        }
    }

    updateShareButton(): void {
        if (this.extension.helper.isUIEnabled('share') && Utils.Bools.getBool(this.options.shareEnabled, true)){
            this.$shareButton.show();
        } else {
            this.$shareButton.hide();
        }
    }

    updateDownloadButton(): void {
        var configEnabled = Utils.Bools.getBool(this.options.downloadEnabled, true);

        if (configEnabled){
            this.$downloadButton.show();
        } else {
            this.$downloadButton.hide();
        }
    }

    updateFeedbackButton(): void {
        var configEnabled = Utils.Bools.getBool(this.options.feedbackEnabled, false);

        if (configEnabled){
            this.$feedbackButton.show();
        } else {
            this.$feedbackButton.hide();
        }
    }

    updateBookmarkButton(): void {
        var configEnabled = Utils.Bools.getBool(this.options.bookmarkEnabled, false);

        if (configEnabled){
            this.$bookmarkButton.show();
        } else {
            this.$bookmarkButton.hide();
        }
    }

    resize(): void {
        super.resize();

        this.updateLogoButtonPosition();
    }
}

export = FooterPanel;
