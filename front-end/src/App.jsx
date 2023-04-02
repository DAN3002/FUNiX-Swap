/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import TransferTokenModal from './components/TransferTokenModal';
import SwapTokenModal from './components/SwapTokenModal';
import ImportAccount from './components/ImportAccount';

function App() {
	const [isSwapActive, setIsSwapActive] = useState(true);

	return (
		<div className="container">
			<h1 className="main-title">FUNiX Swap</h1>
			<div className="main-content">
				<div className="tab-container">
					<div className="tab">
						{/* <div className="tab__item tab__item--active" data-content-id="swap">SWAP</div>
						<div className="tab__item" data-content-id="transfer">TRANSFER</div> */}

						<div
							className={`tab__item ${
								isSwapActive ? 'tab__item--active' : ''
							}`}
							onClick={() => setIsSwapActive(true)}
						>
							SWAP
						</div>
						<div
							className={`tab__item ${
								!isSwapActive ? 'tab__item--active' : ''
							}`}
							onClick={() => setIsSwapActive(false)}
						>
							TRANSFER
						</div>
					</div>
				</div>

				{isSwapActive ? <SwapTokenModal /> : <TransferTokenModal />}
				<ImportAccount />
			</div>
		</div>
	);
}

export default App;
