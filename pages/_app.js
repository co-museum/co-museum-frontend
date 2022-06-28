import PageLayout from "../utils/components/PageLayout";
// import '../static/style.css';

import {ThirdwebWeb3Provider} from "@3rdweb/hooks";

import "regenerator-runtime/runtime";


// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
    const supportedChainIds = [1, 31337];

    const connectors = {
        injected: {},
        walletconnect: {},
    };
    return (<ThirdwebWeb3Provider
            supportedChainIds={supportedChainIds}
            connectors={connectors}>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>
        </ThirdwebWeb3Provider>
    );
}


