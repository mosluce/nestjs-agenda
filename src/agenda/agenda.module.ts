import { DynamicModule } from '@nestjs/common';
import { AGENDA_MODULE_OPTIONS } from './constants';
import {
  Agenda,
  AgendaModuleAsyncOptions,
  AgendaModuleOptions,
} from './interfaces';

export class AgendaModule {
  static forRoot(options: AgendaModuleOptions): DynamicModule {
    const { isGlobal, ...agendaOpts } = options;
    return {
      module: AgendaModule,
      global: isGlobal,
      providers: [
        {
          provide: Agenda,
          useFactory: () => new Agenda(agendaOpts),
        },
      ],
      exports: [Agenda],
    };
  }

  static forRootAsync(options: AgendaModuleAsyncOptions): DynamicModule {
    const { isGlobal, imports = [], ...opts } = options;

    return {
      module: AgendaModule,
      global: isGlobal,
      imports: [...imports],
      providers: [
        {
          provide: AGENDA_MODULE_OPTIONS,
          useFactory: opts.useFactory,
          inject: opts.inject || [],
        },
        {
          provide: Agenda,
          inject: [AGENDA_MODULE_OPTIONS],
          useFactory: (agendaOpts: AgendaModuleOptions) =>
            new Agenda(agendaOpts),
        },
      ],
      exports: [Agenda],
    };
  }
}
