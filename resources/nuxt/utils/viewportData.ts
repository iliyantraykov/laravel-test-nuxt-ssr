const viewportCheck = (): number => {
  let screenwidth = screen.width;
  // iPhone liefert auch im Landscape-Modus die Portrait-Dimensionen
  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && (window.orientation == 90 || window.orientation == -90) && screen.height > screenwidth) {
    screenwidth = screen.height;
  }
  if (screenwidth < 600) {
    return 320;
  } else if (screenwidth < 960) {
    return 600;
  } else if (screenwidth < 1200) {
    return 960;
  } else if (screenwidth < 1500) {
    return 1200;
  } else {
    return 1500;
  }
};

function mediaScreenSize(): number {
  const m600 = window.matchMedia('(max-width: 599px)').matches;
  const m960 = window.matchMedia('(max-width: 959px)').matches;
  const m1200 = window.matchMedia('(max-width: 1199px)').matches;
  let display_size = 1500;

  if (m600) {
    display_size = 600;
  } else if (!m600 && m960) {
    display_size = 960;
  } else if (!m600 && !m960 && m1200) {
    display_size = 1200;
  }
  return display_size;
}

let display_size = -1;

function recalculateScreenSize() {
  const new_display_size = mediaScreenSize();
  if (new_display_size !== display_size) {
    display_size = new_display_size;
    const linkElement = document.getElementById('media-query-stylesheets') as HTMLLinkElement;
    linkElement.href = window.cssMediaMap[display_size];
  }
}

export { viewportCheck, mediaScreenSize, recalculateScreenSize };
