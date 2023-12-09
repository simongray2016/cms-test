export interface IDashboardData {
  totalRequest: TotalRequest;
  totalError: TotalError;
  gpu: Gpu;
  cpu: Cpu;
  ram: Ram;
  system: System;
  historiesRequest: HistoriesRequest[];
  historiesErrors: HistoriesError[];
  historiesGpu: HistoriesGpu[];
  historiesCpu: HistoriesCpu[];
  historiesRam: HistoriesRam[];
  historiesSystem: HistoriesSystem[];
}

export interface TotalRequest {
  totalRequest: number;
  percent: number;
}

export interface TotalError {
  totalRequest: number;
  percent: number;
}

export interface Gpu {
  avg: number;
  min: number;
  max: number;
}

export interface Cpu {
  avg: number;
  min: number;
  max: number;
}

export interface Ram {
  avg: number;
  min: number;
  max: number;
}

export interface System {
  worker: number;
  process: number;
  data: number;
}

export interface HistoriesRequest {
  totalRequest: number;
  percent: number;
  date: number;
}

export interface HistoriesError {
  totalRequest: number;
  percent: number;
  date: number;
}

export interface HistoriesGpu {
  avg: number;
  min: number;
  max: number;
  date: number;
}

export interface HistoriesCpu {
  avg: number;
  min: number;
  max: number;
  date: number;
}

export interface HistoriesRam {
  avg: number;
  min: number;
  max: number;
  date: number;
}

export interface HistoriesSystem {
  worker: number;
  process: number;
  date: number;
}
