/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import TransferTokenModal from './components/TransferTokenModal';
import SwapTokenModal from './components/SwapTokenModal';
import BalanceModal from './components/BalanceModal';
import ImportAccount from './components/ImportAccount';

function App() {
	const [tabName, setTabName] = useState('swap');

	return (
		<div className="container">
			<h1 className="main-title">FUNiX Swap</h1>
			<div className="main-content">
				<div className="tab-container">
					<div className="tab">
						<div
							className={`tab__item ${
								tabName === 'swap' ? 'tab__item--active' : ''
							}`}
							onClick={() => setTabName('swap')}
						>
							SWAP
						</div>
						<div
							className={`tab__item ${
								tabName === 'transfer' ? 'tab__item--active' : ''
							}`}
							onClick={() => setTabName('transfer')}
						>
							TRANSFER
						</div>
						<div
							className={`tab__item ${
								tabName === 'balance' ? 'tab__item--active' : ''
							}`}
							onClick={() => setTabName('balance')}
						>
							BALANCE
						</div>
					</div>
				</div>

				<div className="main-panel">
					{tabName === 'swap' && <SwapTokenModal />}
					{tabName === 'transfer' && <TransferTokenModal />}
					{tabName === 'balance' && <BalanceModal />}
				</div>
				<ImportAccount />
			</div>
		</div>
	);
}

export default App;
