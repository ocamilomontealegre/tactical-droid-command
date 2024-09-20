import { ICoordinates } from "modules/radar/models/interfaces";
import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Audit {
  @ObjectIdColumn()
  /* eslint-disable */
  public _id!: ObjectId;
  /* eslint-enable */

  @Column({ type: String })
  public request!: string;

  @Column("json")
  public response!: ICoordinates | null;

  @CreateDateColumn()
  public timestamp!: Date;

  @Column({ type: Boolean, default: false })
  public isDeleted: boolean = false;

  @Column({ type: Date, nullable: true })
  public deletedAt?: Date;
}
