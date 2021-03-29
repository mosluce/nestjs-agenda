import { Agenda as AgendaLib, AgendaConfig } from 'agenda/dist/agenda';

export class Agenda extends AgendaLib {
  constructor(options: AgendaConfig) {
    super(options);
  }
}
