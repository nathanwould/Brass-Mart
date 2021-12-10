import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../styles/app.css';
import 'antd/dist/antd.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page className="container">
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  )
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
}

export default withData(App);
