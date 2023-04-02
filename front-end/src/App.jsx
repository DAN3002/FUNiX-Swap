/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useState } from 'react';

function App() {
	// const [activeTab, setActiveTab] = useState('swap');

	return (
		<div className="container">
			<h1 className="main-title">FUNiX Swap</h1>
			<div className="main-content">
				<div className="tab-container">
					<div className="tab">
						<div
							className="tab__item tab__item--active"
						>
							SWAP
						</div>
						<div className="tab__item">
							TRANSFER
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
