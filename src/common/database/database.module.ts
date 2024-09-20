import { DataSource, type Repository } from "typeorm";
import { mongoConfig } from "common/env";
import { Logger } from "common/logger/logger.config";
import { Audit } from "modules/audit/entities/audit.entity";

const dataSource = new DataSource({
  type: "mongodb",
  host: mongoConfig.host,
  port: mongoConfig.port,
  username: mongoConfig.user,
  password: mongoConfig.password,
  database: mongoConfig.dbName,
  authSource: "admin",
  entities: [Audit],
  synchronize: true,
});

export const initializeDb = async (): Promise<void> => {
  const logger = new Logger("MongoDB");

  await dataSource.initialize();
  logger.info("MongoDB connected successfully");
};

export const getAuditRepository = (): Repository<Audit> => {
  return dataSource.getRepository(Audit);
};
