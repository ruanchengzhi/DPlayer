// stats.js: JavaScript Performance Monitor
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
function animate () {
    stats.begin();
    // monitored code goes here
    stats.end();

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

initPlayers();
handleEvent();

function handleEvent () {
    document.getElementById('dplayer-dialog').addEventListener('click', (e) => {
        const $clickDom = e.currentTarget;
        const isShowStatus = $clickDom.getAttribute('data-show');

        if (isShowStatus) {
            document.getElementById('float-dplayer').style.display = 'none';
        } else {
            $clickDom.setAttribute('data-show', 1);
            document.getElementById('float-dplayer').style.display = 'block';
        }
    });

    document.getElementById('close-dialog').addEventListener('click', () => {
        const $openDialogBtnDom = document.getElementById('dplayer-dialog');

        $openDialogBtnDom.setAttribute('data-show', '');
        document.getElementById('float-dplayer').style.display = 'none';
    });
}

function initPlayers () {
    // dplayer-float
    window.dpFloat = new DPlayer({
        container: document.getElementById('dplayer-container'),
        preload: 'none',
        screenshot: true,
        video: {
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
            thumbnails: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
        },
        // subtitle: {
        //     url: 'subtitle test'
        // },
        // danmaku: {
        //     id: '9E2E3368B56CDBB4',
        //     api: 'https://api.prprpr.me/dplayer/'
        // }
    });
    // dp1
    window.dp1 = new DPlayer({
        container: document.getElementById('dplayer1'),
        preload: 'none',
        screenshot: false,
        video: {
            // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
            url: 'https://media-cast.shanghaidisneyresort.com.cn/e498dc686eb44a1693467f98333667fd/d43d05c2a8f649df9a7b7c2beedade8e-336e24b1b62e0d00222926c48cc524a0-fd.mp4',
            // url: 'https://media-cast.shanghaidisneyresort.com.cn/93a7abc7838b4460a6fd9aba19ffc459/43bae3049d064444ac2242be7295488c-58c12bace268ff2c9b9f201197d30047-fd.mp4',
            // url: 'http://media-cast.shanghaidisneyresort.com.cn/sv/71c61d0-1707b877795/71c61d0-1707b877795.mov',
            pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
            thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg'
        },
        watermark: 'hi rcz'
        // subtitle: {
        //     url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt'
        // },
        // danmaku: {
        //     id: '9E2E3368B56CDBB4',
        //     api: 'https://api.prprpr.me/dplayer/',
        //     addition: ['https://cn-south-17-dplayer-49648867.oss.dogecdn.com/1678963.json']
        // }
    });
    // window.dp1.watermark('12345678 <br>Zhuangzhuang Zhang<br>2020-05-26')
    window.dp1.watermark('01236785 <br>Yuankai-ka Zhu<br>2020-05-28')
    // dp2
    window.dp2 = new DPlayer({
        container: document.getElementById('dplayer2'),
        preload: 'none',
        autoplay: false,
        theme: '#FADFA3',
        loop: true,
        lang: 'en',
        screenshot: true,
        hotkey: true,
        logo: 'https://i.loli.net/2019/06/06/5cf8c5d94521136430.png',
        volume: 0.2,
        mutex: true,
        video: {
            // url: 'https://apk.sfsctech.com/media/huoshenshan.mp4', 
             url: 'https://media-cast.shanghaidisneyresort.com.cn/93a7abc7838b4460a6fd9aba19ffc459/43bae3049d064444ac2242be7295488c-58c12bace268ff2c9b9f201197d30047-fd.mp4',
            // 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
            pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
            thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
            type: 'auto'
        },
        subtitle: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt',
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#b7daff'
        },
        danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://api.prprpr.me/dplayer/',
            token: 'tokendemo',
            maximum: 3000,
            user: 'DIYgod',
            bottom: '15%',
            unlimited: true
        },
        contextmenu: [
            {
                text: 'custom contextmenu',
                link: 'https://github.com/MoePlayer/DPlayer'
            }
        ]
    });
    dp2.on('error', function () {
        console.log('dp2 error' );
    });
    const events = [
        'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error',
        'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play',
        'playing', 'ratechange', 'seeked', 'seeking', 'stalled',
        'volumechange', 'waiting',
        'screenshot',
        'thumbnails_show', 'thumbnails_hide',
        'danmaku_show', 'danmaku_hide', 'danmaku_clear',
        'danmaku_loaded', 'danmaku_send', 'danmaku_opacity',
        'contextmenu_show', 'contextmenu_hide',
        'notice_show', 'notice_hide',
        'quality_start', 'quality_end',
        'destroy',
        'resize',
        'fullscreen', 'fullscreen_cancel', 'webfullscreen', 'webfullscreen_cancel',
        'subtitle_show', 'subtitle_hide', 'subtitle_change'
    ];
    const eventsEle = document.getElementById('events');
    for (let i = 0; i < events.length; i++) {
        dp2.on(events[i], (info) => {
            eventsEle.innerHTML += '<p>Event: ' + events[i] + '</p>';
            eventsEle.scrollTop = eventsEle.scrollHeight;
        });
    }

    // dp3
    // window.dp3 = new DPlayer({
    //     container: document.getElementById('dplayer3'),
    //     preload: 'none',
    //     video: {
    //         quality: [{
    //             name: 'HD',
    //             url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
    //             type: 'hls'
    //         }, {
    //             name: 'SD',
    //             url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
    //             type: 'normal'
    //         }],
    //         defaultQuality: 0,
    //         pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png'
    //     }
    // });

    // // dp4
    // window.dp4 = new DPlayer({
    //     container: document.getElementById('dplayer4'),
    //     preload: 'none',
    //     video: {
    //         url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
    //         type: 'hls'
    //     }
    // });

    // // dp5
    // window.dp5 = new DPlayer({
    //     container: document.getElementById('dplayer5'),
    //     preload: 'none',
    //     video: {
    //         url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.flv',
    //         type: 'flv'
    //     }
    // });

    // window.dp8 = new DPlayer({
    //     container: document.getElementById('dplayer8'),
    //     preload: 'none',
    //     video: {
    //         url: 'https://moeplayer.b0.upaiyun.com/dplayer/dash/hikarunara.mpd',
    //         type: 'dash'
    //     }
    // });

    // window.dp9 = new DPlayer({
    //     container: document.getElementById('dplayer9'),
    //     video: {
    //         url: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
    //         type: 'webtorrent'
    //     }
    // });

    // window.dp6 = new DPlayer({
    //     container: document.getElementById('dplayer6'),
    //     preload: 'none',
    //     live: true,
    //     danmaku: true,
    //     apiBackend: {
    //         read: function (endpoint, callback) {
    //             console.log('假装 WebSocket 连接成功');
    //             callback();
    //         },
    //         send: function (endpoint, danmakuData, callback) {
    //             console.log('假装通过 WebSocket 发送数据', danmakuData);
    //             callback();
    //         }
    //     },
    //     video: {
    //         url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
    //         type: 'hls'
    //     }
    // });

    // window.dp10 = new DPlayer({
    //     container: document.getElementById('dplayer10'),
    //     video: {
    //         url: 'https://qq.webrtc.win/tv/Pear-Demo-Yosemite_National_Park.mp4',
    //         type: 'pearplayer',
    //         customType: {
    //             'pearplayer': function (video, player) {
    //                 new PearPlayer(video, {
    //                     src: video.src,
    //                     autoplay: player.options.autoplay
    //                 });
    //             }
    //         }
    //     }
    // });
}

function clearPlayers () {
    for (let i = 0; i < 6; i++) {
        window['dp' + (i + 1)].pause();
        document.getElementById('dplayer' + (i + 1)).innerHTML = '';
    }
}

function switchDPlayer () {
    if (dp2.option.danmaku.id !== '5rGf5Y2X55qu6Z2p') {
        dp2.switchVideo({
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
            type: 'auto',
        }, {
            id: '5rGf5Y2X55qu6Z2p',
            api: 'https://api.prprpr.me/dplayer/',
            maximum: 3000,
            user: 'DIYgod'
        });
    } else {
        dp2.switchVideo({
            url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
            pic: 'https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png',
            thumbnails: 'https://i.loli.net/2019/06/06/5cf8c5d9cec8510758.jpg',
            type: 'auto'
        }, {
            id: '9E2E3368B56CDBB42',
            api: 'https://api.prprpr.me/dplayer/',
            maximum: 3000,
            user: 'DIYgod'
        });
    }
}