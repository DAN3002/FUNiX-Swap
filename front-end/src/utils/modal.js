import Swal from 'sweetalert2';

const modal = {
	showConfirmSwap: (swapInfo) => {
		const {
			sourceToken,
			destToken,
			sourceAmount,
			destAmount,
			rate,
		} = swapInfo;

		return Swal.fire({
			title: 'Confirm Swap',
			html: `
				<div>
					<p>Are you sure you want to swap?</p>
				</div>
				<div class="modal__token">
					<div class="src-swap">${sourceAmount} ${sourceToken.symbol}</div>
					<img src="/assets/images/icons/arrow-right.svg" alt="">
					<div class="dest-swap">${destAmount} ${destToken.symbol}</div>
				</div>
				<div class="modal__rate"><span class="rate-swap">1 ${sourceToken.symbol} = ${rate} ${destToken.symbol}</span></div>
				<!-- <div class="modal__fee">GAS Fee: <span id="gas-amount">0.0001 TOMO</span></div> -->
			`,
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Confirm',
			width: 750,
		});
	},
	showAlert: (message) => {
		return Swal.fire({
			title: 'Error',
			text: message,
			icon: 'error',
			confirmButtonText: 'OK',
		});
	},
};

export default modal;
