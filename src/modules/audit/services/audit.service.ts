import { injectable } from "inversify";
import { ObjectId as MongoObject } from "mongodb";
import { ObjectId, Repository } from "typeorm";
import { Audit } from "../entities/audit.entity";
import { CreateAuditDto } from "../dto";
import { getAuditRepository } from "common/database/database.module";

@injectable()
export class AuditService {
  private readonly _auditRepository: Repository<Audit>;

  public constructor() {
    this._auditRepository = getAuditRepository();
  }

  public async create(audit: CreateAuditDto): Promise<void> {
    const auditInstance = this._auditRepository.create(audit);
    await this._auditRepository.save(auditInstance);
  }

  public async getAll(): Promise<Audit[]> {
    return this._auditRepository.find({
      order: { timestamp: "DESC" },
      take: 100,
    });
  }

  public async getById(id: ObjectId): Promise<Audit | null> {
    const objectId = new MongoObject(id);
    const result = await this._auditRepository.findOne({
      where: { _id: objectId },
    });
    return result;
  }

  public async deleteById(id: ObjectId): Promise<boolean> {
    const objectId = new MongoObject(id);
    const result = await this._auditRepository.update(objectId, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    return result.affected === 1;
  }
}
