import PageLayout from "../utils/components/PageLayout";
// import '../static/style.css';

import {ThirdwebWeb3Provider} from "@3rdweb/hooks";

import "regenerator-runtime/runtime";
import {Provider} from "react-redux";
import store from '../slices/store'

const App = ({Component, pageProps}) => {
    const supportedChainIds = [1, 31337];

    const connectors = {
        injected: {},
        walletconnect: {},
    };

    return (<ThirdwebWeb3Provider
            supportedChainIds={supportedChainIds}
            connectors={connectors}>
            <Provider store={store}>
                <PageLayout>
                    <Component {...pageProps} />
                </PageLayout>
            </Provider>
        </ThirdwebWeb3Provider>
    );
}

export default App

