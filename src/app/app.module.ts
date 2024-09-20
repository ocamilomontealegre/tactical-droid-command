import { Container } from "inversify";
import { HealthModule } from "health/health.module";
import { AuditModule } from "modules/audit/audit.module";
import { RadarModule } from "modules/radar/radar.module";
import { AppRouter } from "./router/app.router";

export class AppModule {
  private readonly _container: Container;

  public constructor() {
    this._container = new Container();
    this._initializeModules();
  }

  private _initializeModules(): void {
    this._container.load(HealthModule);
    this._container.load(RadarModule);
    this._container.load(AuditModule);
    this._container.bind<AppRouter>(AppRouter).toSelf().inSingletonScope();
  }

  public getContainer(): Container {
    return this._container;
  }
}
