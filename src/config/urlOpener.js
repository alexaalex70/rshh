import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';

async function urlOpener(url, redirectUrl) {
  try {
    await InAppBrowser.isAvailable();
    const { type, url: newUrl } = await InAppBrowser.openAuth(
      url,
      redirectUrl,
      {
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
        ephemeralWebSession: true,
      }
    );

    if (type === 'success') {
      Linking.openURL(newUrl);
    }
  } catch (e) {
    console.log(e);
  }
}

export default urlOpener;
