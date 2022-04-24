class HotKey {
    constructor(player) {
        this.skipStep = 5;
        this.volumeStep = 0.01;
        this.lastTouch = -200;

        if (player.options.hotkey) {
            document.addEventListener('keydown', (e) => {
                if (player.focus) {
                    const tag = document.activeElement.tagName.toUpperCase();
                    const editable = document.activeElement.getAttribute('contenteditable');
                    if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
                        const event = e || window.event;
                        let percentage;
                        switch (event.keyCode) {
                            case 32:
                                event.preventDefault();
                                player.toggle();
                                break;
                            case 37:
                                event.preventDefault();
                                if (player.options.live) {
                                    break;
                                }
                                player.seek(player.video.currentTime - this.skipStep);
                                player.controller.setAutoHide();
                                break;
                            case 39:
                                event.preventDefault();
                                if (player.options.live) {
                                    break;
                                }
                                player.seek(player.video.currentTime + this.skipStep);
                                player.controller.setAutoHide();
                                break;
                            case 38:
                                event.preventDefault();
                                percentage = player.volume() + this.volumeStep;
                                player.volume(percentage);
                                break;
                            case 40:
                                event.preventDefault();
                                percentage = player.volume() - this.volumeStep;
                                player.volume(percentage);
                                break;
                        }
                    }
                }
            });
            document.addEventListener('mousewheel', (e) => {
                if (player.focus) {
                    if (e.deltaY < -2) {
                        player.volume(player.volume() - this.volumeStep);
                    } else if (e.deltaY > 2) {
                        player.volume(player.volume() + this.volumeStep);
                    }
                    if (e.deltaX < -2) {
                        player.seek(player.video.currentTime + this.skipStep);
                        player.controller.setAutoHide();
                    } else if (e.deltaX > 2) {
                        player.seek(player.video.currentTime - this.skipStep);
                        player.controller.setAutoHide();
                    }
                }
            });
            document.addEventListener('touchstart', (e) => {
                if (player.focus) {
                    const interval = e.timeStamp - this.lastTouch;
                    const pos = player.container.getBoundingClientRect();
                    const rew = [pos.x, pos.x + player.container.clientWidth * 0.3];
                    const ff = [pos.x + player.container.clientWidth * 0.6, pos.x + player.container.clientWidth];
                    this.lastTouch = e.timeStamp;
                    if (interval < 200 && e.targetTouches[0].clientX > rew[0] && e.targetTouches[0].clientX < rew[1]) {
                        player.seek(player.video.currentTime - this.skipStep);
                    }
                    if (interval < 200 && e.targetTouches[0].clientX > ff[0] && e.targetTouches[0].clientX < ff[1]) {
                        player.seek(player.video.currentTime + this.skipStep);
                    }
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            const event = e || window.event;
            switch (event.keyCode) {
                case 27:
                    if (player.fullScreen.isFullScreen('web')) {
                        player.fullScreen.cancel('web');
                    }
                    break;
            }
        });
    }
}

export default HotKey;
