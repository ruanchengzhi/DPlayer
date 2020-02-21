class Watermark {
    constructor(container, video, options, events) {
        this.container = container;
        this.video = video;
        this.options = options;
        this.events = events;

        this.init();
    }

    init() {
        this.container.style.fontSize = this.options.fontSize;
        this.container.style.bottom = this.options.bottom;
        this.container.style.color = this.options.color;

        // if (this.video.textTracks && this.video.textTracks[0]) {
        //     const track = this.video.textTracks[0];
        //     track.oncuechange = () => {
        //         const cue = track.activeCues[0];
        //         this.container.innerHTML = '';
        //         if (cue) {
        //             const template = document.createElement('div');
        //             template.appendChild(cue.getCueAsHTML());
        //             const trackHtml = template.innerHTML
        //                 .split(/\r?\n/)
        //                 .map((item) => `<p>${item}</p>`)
        //                 .join('');
        //             this.container.innerHTML = trackHtml;
        //             console.log('trackHtml =' + trackHtml);
        //         }
        //         else {
        //             console.log('cue=' + cue);
        //         }
        //         this.events.trigger('watermark_change');
        //     };
        // }
        // else {
        //     console.log('init watermark textTracks null');
        // }
    }

    show() {
        this.container.classList.remove('dplayer-watermark-hide');
        this.events.trigger('watermark_show');
    }

    hide() {
        this.container.classList.add('dplayer-watermark-hide');
        this.events.trigger('watermark_hide');
    }

    toggle() {
        if (this.container.classList.contains('dplayer-watermark-hide')) {
            this.show();
        } else {
            this.hide();
        }
    }
}

export default Watermark;
