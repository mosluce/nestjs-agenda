import { ModuleMetadata } from '@nestjs/common';
import { AgendaConfig } from 'agenda';

export interface AgendaModuleOptions extends AgendaConfig {
  isGlobal?: boolean;
}

export interface AgendaModuleOptionsOmit
  extends Omit<AgendaModuleOptions, 'isGlobal'> {}

export interface AgendaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<AgendaModuleOptionsOmit> | AgendaModuleOptionsOmit;
}
