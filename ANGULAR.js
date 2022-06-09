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
# Socket
import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TuiAlertService} from '@taiga-ui/core';
import {Socket} from 'socket.io';
import * as io from 'socket.io-client';

enum EVENT_NAMES {
  PLUGIN_RESPONSE = 'pluginResponse',
  CONNECTION = 'connection',
  PLUGIN_RECEIVED = 'pluginReceived',
  PLUGIN_SEND = 'pluginSend'
}

const URI = 'http://localhost:9060';


interface PluginDto {
  status: boolean;
  buffer: Buffer;
}

@Component({
  selector: 'banshop-plugins-page',
  templateUrl: './plugins-page.component.html',
  styleUrls: ['./plugins-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PluginsPageComponent implements OnInit, OnDestroy {
  private socket: any;

  constructor(@Inject(TuiAlertService)
              private readonly alertService: TuiAlertService) {
    this.connect();
  }

  ngOnInit(): void {
    this.socket.on(EVENT_NAMES.PLUGIN_RESPONSE, (data: PluginDto) => {
      console.log(EVENT_NAMES.PLUGIN_RESPONSE, data);
      this.socket.emit(EVENT_NAMES.PLUGIN_RECEIVED, 'Plugin has been successfully received');
    });
  }

  receivePlugin(pluginName: string = 'CutHoles_2020.dll'): void {
    this.socket.emit(EVENT_NAMES.PLUGIN_SEND, pluginName);
  }

  connect() {
    this.socket = io.connect(URI);
    this.socket.on(EVENT_NAMES.CONNECTION, (event: any) => {
      console.log('SOCKET IO connect', event);
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
