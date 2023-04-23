import Swal from 'sweetalert2';

const modal = {
	showConfirmSwap: () => {
		return Swal.fire({
			title: 'Confirm Swap',
			html: `
				<div class="modal__token">
					<div class="src-swap">1 TOMO</div>
					<img src="/assets/images/icons/arrow-right.svg" alt="">
					<div class="dest-swap">0.29 TKA</div>
				</div>
				<div class="modal__rate"><span class="rate-swap">1 TOMO = 0.29 TKA</span></div>
				<div class="modal__fee">GAS Fee: <span id="gas-amount">0.0001 TOMO</span></div>
			`,
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Confirm',
		});
	},
};

export default modal;
