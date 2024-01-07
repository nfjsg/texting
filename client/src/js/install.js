const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PW
// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    console.error('The deferred prompt is not available.');
    return;
  }
  butInstall.style.display = 'none';
  try {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
  } catch (error) {
    console.error('Installation failed', error);
  } finally {
    deferredPrompt = null;
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  deferredPrompt = null;
  console.log('PWA was installed');
});
