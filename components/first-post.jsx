// REMOVED from pages/posts

import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import Layaut from '../../components/layaut';

export default function FirstPost() {
  return (
    <Layaut>
      <Head>
        <title>First Post</title>
        <Script
          // Third-Party JavaScript
          src="https://connect.facebook.net/en_US/sdk.js"
          // strategy controls when the third-party script should load. A value of lazyOnload tells Next.js to load this particular script lazily during browser idle time
          strategy="lazyOnload"
          // onLoad is used to run any JavaScript code immediately after the script has finished loading. In this example, we log a message to the console that mentions that the script has loaded correctly
          onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
          }
        />
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href={'/'}>Back to home</Link>
      </h2>
    </Layaut>
  );
}
