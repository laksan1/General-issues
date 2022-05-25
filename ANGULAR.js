ng g m modules/bim-analytics --routing --force // Добавить модуль с роутом

// Отключение ngZone
@Injectable()
export class SomeService {
	constructor(private ngZone: NgZone){
		this.ngZone.runOutsideAngular(() => {
			interval(1).subscribe(() => {
				// somo code
			})
		});
	}
}