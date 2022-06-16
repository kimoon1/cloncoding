; (function () {
  'use strict'

  const get = (target) => document.querySelector(target);
  const getAll = (target) => document.querySelectorAll(target);

  const $search = get('#search');
  const $list = getAll('.contents.list figure');
  const $searchButton = get('.btn_search');

  const $player = get('.view video');
  const $btnPlay = get('.js-play');
  const $btnReplay = get('.js-replay');
  const $btnStop = get('.js-stop');
  const $btnMute = get('.js-mute');
  const $progress = get('.js-progress');
  const $volume = get('.js-volume');
  const $fullscreen = get('.js-fullScreen');

  const init = () => {
    $search.addEventListener('keyup', search);
    $searchButton.addEventListener('click', search);

    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('picture');

      $target.addEventListener('mouseover', onMouseOver);
      $target.addEventListener('mouseout', onMouseout)
    }

    for (let index = 0; index < $list.length; index++) {
      $list[index].addEventListener('click', hashChange);
    }
    window.addEventListener('hashchange', () => {
      const isview = -1 < window.location.hash.indexOf('view');
      if (isview) {
        getViewPage();
      } else {
        getListView();
      }
    });

    viewPageEvent();

  }

  const search = () => {
    let searchText = $search.value.toLowerCase();
    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('strong');
      const text = $target.textContent.toLowerCase();
      if (-1 < text.indexOf(searchText)) {
        $list[index].style.display = 'flex'
      } else {
        $list[index].style.display = 'none'
      }
    }
  }

  const onMouseOver = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source');
    webpPlay.setAttribute('srcset', './assets/sample.webp');
  }
  const onMouseout = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source');
    webpPlay.setAttribute('srcset', './assets/sample.jpg');
  }

  const hashChange = (e) => {
    e.preventDefault();
    const parentNode = e.target.closest('figure');
    const viewTitle = parentNode.querySelector('strong').textContent;

    window.location.hash = `view&${viewTitle}`;
    getViewPage();
  }

  const getViewPage = (e) => {
    const viewTitle = get('.view strong');
    const urlTitle = decodeURI(window.location.hash.split('&')[1]);

    viewTitle.innerText = urlTitle;
    get('.list').style.display = 'none';
    get('.view').style.display = 'flex';
  }

  const getListView = (e) => {
    get('.list').style.display = 'flex';
    get('.view').style.display = 'none';
  }

  const buttonChange = (btn, value) => {
    btn.innerHTML = value;
  }

  const viewPageEvent = () => {
    $volume.addEventListener('change', (e) => {
      $player.volume = e.target.value;
    });

    $player.addEventListener('timeupdate', setProgress);
    $player.addEventListener('play', buttonChange($btnPlay, 'pause'));
    $player.addEventListener('pause', buttonChange($btnPlay, 'play'));
    $player.addEventListener('volumeChange', () => {
      $player.muted ? buttonChange($btnMute, 'unmute') : buttonChange($btnMute, 'mute');
    });

    $player.addEventListener('ended', $player.pause());
    $progress.addEventListener('click', getCurrent);
    $btnPlay.addEventListener('click', playVideo);
    $btnStop.addEventListener('click', stopVideo);
    $btnReplay.addEventListener('click', replayVideo);
    $btnMute.addEventListener('click', mute);
    $fullscreen.addEventListener('click', fullScreen);
  }

  const getCurrent = (e) => {
    let percent = e.offsetX / $progress.offsetWidth;
    $player.currentTime = percent * $player.duration;
    e.target.value = Math.floor(percent / 100);
  };

  const setProgress = (e) => {
    let percentage = Math.floor((100 / $player.duration) * $player.currentTime);
    $progress.value = percentage;
  };

  const playVideo = () => {
    if ($player.paused || $player.ended) {
      buttonChange($btnPlay, 'pause');
      $player.play();
    } else {
      buttonChange($btnPlay, 'paly');
      $player.pause();
    }
  }

  const stopVideo = () => {
    $player.pause();
    $player.currentTime = 0;
    buttonChange($btnPlay, 'play');
  }

  const resetPlayer = () => {
    $progress.value = 0;
    $player.currentTime = 0;
  }

  const replayVideo = () => {
    resetPlayer();
    $player.play();
    buttonChange($btnPlay, 'pause');
  }

  const mute = () => {
    if ($player.muted) {
      buttonChange($btnMute, 'mute');
      $player.muted = false;
    } else {
      buttonChange($btnMute, 'unmute');
      $player.muted = true;
    }
  }

  const fullScreen = () => {
    if ($player.requestFullscreen) {
      if (document.fullscreenElement) {
        document.cancelFullScreen();
      } else {
        $player.requestFullscreen();
      }
    } else if ($player.msRequestFullscreen) {
      if (document.msRequestFullscreen) {
        document.msExitFullscreen();
      } else {
        $player.msRequestFullscreen();
      }
    } else {
      alert('Not fullScreen')
    }
  }

  init();
})()
