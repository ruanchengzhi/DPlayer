import utils from './utils';

class FullScreen {
    constructor(player) {
        this.player = player;
        this.lastScrollPosition = { left: 0, top: 0 };
        this.player.events.on('webfullscreen', () => {
            this.player.resize();
        });
        this.player.events.on('webfullscreen_cancel', () => {
            this.player.resize();
            utils.setScrollPosition(this.lastScrollPosition);
        });

        const fullscreenchange = () => {
            this.player.resize();
            if (this.isFullScreen('browser')) {
                this.player.events.trigger('fullscreen');
            } else {
                // add by rcz
                console.log('will cancel fullscreen');
                if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                    this.player.container.classList.remove('dplayer-fulled');
                }
                console.log('fullscreenchange : ' + JSON.stringify(this.lastScrollPosition));
                utils.setScrollPosition(this.lastScrollPosition);
                this.player.events.trigger('fullscreen_cancel');
            }
        };
        const docfullscreenchange = () => {
            const fullEle = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (fullEle && fullEle !== this.player.container) {
                return;
            }
            this.player.resize();
            if (fullEle) {
                this.player.events.trigger('fullscreen');
            } else {
                console.log('docfullscreenchange : ' + this.lastScrollPosition);
                utils.setScrollPosition(this.lastScrollPosition);
                this.player.events.trigger('fullscreen_cancel');
            }
        };
        if (/Firefox/.test(navigator.userAgent)) {
            document.addEventListener('mozfullscreenchange', docfullscreenchange);
            document.addEventListener('fullscreenchange', docfullscreenchange);
        } else {
            this.player.container.addEventListener('fullscreenchange', fullscreenchange);
            this.player.container.addEventListener('webkitfullscreenchange', fullscreenchange);
            document.addEventListener('msfullscreenchange', docfullscreenchange);
            document.addEventListener('MSFullscreenChange', docfullscreenchange);
        }
    }

    isFullScreen(type = 'browser') {
        switch (type) {
            case 'browser':
                return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
            case 'web':
                return this.player.container.classList.contains('dplayer-fulled');
        }
    }

    request(type = 'browser') {
        const anotherType = type === 'browser' ? 'web' : 'browser';
        const anotherTypeOn = this.isFullScreen(anotherType);
        if (!anotherTypeOn) {
            this.lastScrollPosition = utils.getScrollPosition();
        }

        console.log('browser fullscreen');
        switch (type) {
            case 'browser':
                if (this.player.container.requestFullscreen) {
                    console.log('1');
                    this.player.container.requestFullscreen();
                    this.player.container.classList.add('dplayer-fulled');
                    // console.dir(this.player.container);
                } else if (this.player.container.mozRequestFullScreen) {
                    console.log('2');
                    this.player.container.mozRequestFullScreen();
                } else if (this.player.container.webkitRequestFullscreen) {
                    console.log('3');
                    this.player.container.webkitRequestFullscreen();
                    this.player.container.classList.add('dplayer-fulled');
                } else if (this.player.video.webkitEnterFullscreen) {
                    // Safari for iOS
                    this.player.video.webkitEnterFullscreen();
                    console.log('4');
                } else if (this.player.video.webkitEnterFullScreen) {
                    this.player.video.webkitEnterFullScreen();
                    console.log('5');
                } else if (this.player.container.msRequestFullscreen) {
                    this.player.container.msRequestFullscreen();
                    console.log('6');
                }
                break;
            case 'web':
                this.player.container.classList.add('dplayer-fulled');
                document.body.classList.add('dplayer-web-fullscreen-fix');
                this.player.events.trigger('webfullscreen');
                break;
        }

        if (anotherTypeOn) {
            this.cancel(anotherType);
        }
    }

    cancel(type = 'browser') {
        switch (type) {
            case 'browser':
                if (document.cancelFullScreen) {
                    console.log('cancel 1');
                    document.cancelFullScreen();
                    this.player.container.classList.remove('dplayer-fulled');
                } else if (document.mozCancelFullScreen) {
                    console.log('cancel 2');
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    console.log('cancel 3');
                    this.player.container.classList.remove('dplayer-fulled');
                    document.webkitCancelFullScreen();
                } else if (document.webkitCancelFullscreen) {
                    console.log('cancel 4');
                    document.webkitCancelFullscreen();
                } else if (document.msCancelFullScreen) {
                    console.log('cancel 5');
                    document.msCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    console.log('cancel 6');
                    document.msExitFullscreen();
                }
                break;
            case 'web':
                this.player.container.classList.remove('dplayer-fulled');
                document.body.classList.remove('dplayer-web-fullscreen-fix');
                this.player.events.trigger('webfullscreen_cancel');
                break;
        }
    }

    toggle(type = 'browser') {
        if (this.isFullScreen(type)) {
            this.cancel(type);
        } else {
            this.request(type);
        }
    }
}

export default FullScreen;
