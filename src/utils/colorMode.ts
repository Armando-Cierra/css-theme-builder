const savedColorMode = window.localStorage.getItem('colormode');
const systemPreference = window.matchMedia('(prefers-color-scheme: light)');

const changeTheme = () => {
  if (systemPreference.matches) {
    document.body.className = 'light';
  } else {
    document.body.className = 'dark';
  }
};

const verifyEvent = () => {
  if (localStorage.getItem('colormode') === 'auto') {
    changeTheme();
  }
};

if (!savedColorMode) {
  changeTheme();
  localStorage.setItem('colormode', 'auto');
  systemPreference.addEventListener('change', verifyEvent);
} else {
  if (savedColorMode === 'auto') {
    changeTheme();
    systemPreference.addEventListener('change', verifyEvent);
  } else {
    document.body.className = savedColorMode;
  }
}
